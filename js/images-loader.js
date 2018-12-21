import {Frame2Size} from './settings';
import {resize} from './resize';
export default class ImagesLoader {

  constructor(model) {
    return Promise.all(model.levels.map((level) => {
      return Promise.all(level.answers.map((answer) => {
        return this._loadImage(answer.image.url)
          .then((image) => {
            const frameSize = Frame2Size[level.type];
            const size = {width: image.naturalWidth, height: image.naturalHeight};
            const newSize = resize(frameSize, size);
            const newImage = Object.assign({}, answer.image, newSize);

            answer.image = newImage;
            return answer;
          });
      })).then((newAnswers) => {
        level.answers = newAnswers;
        return level;
      });
    })).then((newLevels) => {
      model.levels = newLevels;
      return model;
    });
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
