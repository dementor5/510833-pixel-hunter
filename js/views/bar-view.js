import AbstractView from '../abstract-view';
import {Rule} from '../settings';

export default class BarView extends AbstractView {
  constructor(time, livesAmount) {
    super();
    this._time = time;
    this._livesAmount = livesAmount;
    this.heartTemplate = ``;
    const heartsForDrawing = Rule.INITIAL_LIVE_COUNT - 1;
    for (let i = heartsForDrawing; i >= 1; i--) {
      this.heartTemplate += this._drawHeart(this._livesAmount > i);
    }
  }

  get template() {
    return `
      <div class="game__timer">${this._time}</div>
      <div class="game__lives">
        ${this.heartTemplate}
      </div>`;
  }

  _drawHeart(full) {
    const name = full ? `heart__full.svg` : `heart__empty.svg`;
    const altName = full ? `Life` : `Missed Life`;
    return `<img src="img/${name}" class="game__heart" alt="${altName}" width="31" height="27">`;
  }
}
