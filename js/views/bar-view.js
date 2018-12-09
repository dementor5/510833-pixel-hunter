import AbstractView from './abstract-view';

export default class BarView extends AbstractView {
  constructor(livesAmount) {
    super();
    this._time = 15;
    this._livesAmount = livesAmount;
  }

  get template() {
    return `
      <div class="game__timer">${this._time}</div>
      <div class="game__lives">
        ${this._drawHeart(this._livesAmount > 3)}
        ${this._drawHeart(this._livesAmount > 2)}
        ${this._drawHeart(this._livesAmount > 1)}
      </div>`;
  }

  _drawHeart(full) {
    const name = full ? `heart__full.svg` : `heart__empty.svg`;
    const altName = full ? `Life` : `Missed Life`;
    return `<img src="img/${name}" class="game__heart" alt="${altName}" width="31" height="27">`;
  }
}
