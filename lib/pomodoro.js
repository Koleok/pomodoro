'use babel';

import { exec, child } from 'child_process';

import PomodoroTimer from './pomodoro-timer';
import PomodoroView from './pomodoro-view';

export default {
  config: {
    period: {
      type: 'integer',
      'default': 25,
    },
    pathToExecuteWithTimerStart: {
      type: 'string',
      'default': '',
    },
    pathToExecuteWithTimerAbort: {
      type: 'string',
      'default': '',
    },
    pathToExecuteWithTimerFinish: {
      type: 'string',
      'default': '',
    },
    playSounds: {
      type: 'boolean',
      'default': true,
    }
  },

  activate() {
    atom.commands.add('atom-workspace', {
      'pomodoro:start': () => _this.start(),
      'pomodoro:abort': () => _this.abort(),
    });

    this.timer = new PomodoroTimer();
    return this.timer.on('finished', () => _this.finish());
  },

  consumeStatusBar(statusBar) {
    this.view = new PomodoroView(this.timer);
    return statusBar.addRightTile({
      item: this.view,
      priority: 200
    });
  },

  start() {
    console.log('pomodoro: start');
    this.timer.start();
    return this.exec(atom.config.get('pomodoro.pathToExecuteWithTimerStart'));
  },

  abort() {
    console.log('pomodoro: abort');
    this.timer.abort();
    return this.exec(atom.config.get('pomodoro.pathToExecuteWithTimerAbort'));
  },

  finish() {
    console.log('pomodoro: finish');
    this.timer.finish();
    return this.exec(atom.config.get('pomodoro.pathToExecuteWithTimerFinish'));
  },

  exec(path) {
    if (path) {
      return exec(path, (err, stdout, stderr) => {
        if (stderr) console.log(stderr);

        return console.log(stdout);
      });
    }
  },

  deactivate() {
    this.view.destroy();
    return this.view = null;
  }
};
