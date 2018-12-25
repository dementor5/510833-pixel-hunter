import {Frame2Size} from './settings';
import {resize} from './resize';
export default class ImagesLoader {

  constructor(model) {
    this._model = model;
  }

  async loadImages() {
    const levelsPromises = this._model.levels.map(async (level) => {
      const answersPromises = level.answers.map(async (answer) => {
        const frameSize = Frame2Size[level.type];
        const image = await this._loadImage(answer.image.url);
        const size = {width: image.naturalWidth, height: image.naturalHeight};
        const newSize = resize(frameSize, size);

        const newImage = Object.assign({}, answer.image, newSize);
        answer.image = newImage;
        return answer;
      });

      const newAnswers = await Promise.all(answersPromises);
      level.answers = newAnswers;
      return level;
    });

    const newLevels = await Promise.all(levelsPromises);
    this._model.levels = newLevels;
    return this._model;
  }

  _loadImage(url) {
    return new Promise((onLoad, onError) => {
      const image = new Image();
      image.onload = () => onLoad(image);
      image.onerror = () => onError(`Не удалось загрузить картинку: ${url}`);
      image.src = url;
    });
  }

}
