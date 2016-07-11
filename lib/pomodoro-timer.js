'use babel'

import events from 'events';

export default class PomodoroTimer extends events.EventEmitter {
  constructor() {
    super();
    this.ticktack = new Audio(require('../resources/ticktack').data());
    this.bell = new Audio(require('../resources/bell').data());
    this.ticktack.loop = true;
  }

  start() {
    if (atom.config.get('pomodoro.playSounds')) {
      this.ticktack.play();
    }
    this.startTime = new Date();
    this.minutes = atom.config.get('pomodoro.period');
    return this.timer = setInterval(( () => this.step() ), 1000);
  }

  abort() {
    this.status = `aborted (${new Date()})`;
    return this.stop();
  }

  time() {
    return this.minutes * 60 * 1000;
  }

  finish() {
    this.status = `finished (${new Date()})`;
    this.stop();
    if (atom.config.get('pomodoro.playSounds')) {
      return this.bell.play();
    }
  }

  stop() {
    this.ticktack.pause();
    clearTimeout(this.timer);
    return this.updateCallback(this.status);
  }

  step() {
    let time = (this.time() - (new Date() - this.startTime)) / 1000;
    if (time <= 0) {
      return this.emit('finished');
    } else {
      let min = this.zeroPadding(Math.floor(time / 60));
      let sec = this.zeroPadding(Math.floor(time % 60));
      this.status = `${min}:${sec}`;
      return this.updateCallback(this.status);
    }
  }

  zeroPadding(num) {
    return (`0${num}`).slice(-2);
  }

  setUpdateCallback(fn) {
    return this.updateCallback = fn;
  }
};
