'use babel';

import { View } from 'atom-space-pen-views';

export default class PomodoroView extends View {
  constructor(...args) {
    super(...args);
    this.update = this.update.bind(this);
  }

  static content() {
    return this.div({ class: 'pomodoro inline-block' }, () => {
      this.span({ style: 'color: red' }, `${String.fromCharCode(10086)}`);
      return this.span({ outlet: 'statusText' });
    });
  }

  initialize(timer) {
    return timer.setUpdateCallback(this.update);
  }

  destroy() {
    return this.detach();
  }

  update(status) {
    return this.statusText.text(status);
  }
};
