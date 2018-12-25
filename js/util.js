const REMOVE_DELAY = 2000;
const CONTAINER_TAG = `div`;
const mainEl = document.querySelector(`#main`);

export const render = (template = ``) => {
  const wrapper = document.createElement(CONTAINER_TAG);
  wrapper.innerHTML = template.trim();
  return wrapper.firstChild;
};

export const crossfadeChangeScreen = (element) => {
  const previosScreen = mainEl.firstElementChild;
  previosScreen.classList.add(`crossfade`, `crossfade--hide`);
  element.classList.add(`crossfade`, `crossfade--show`);
  mainEl.appendChild(element);
  setTimeout(() => {
    previosScreen.remove();
  }, REMOVE_DELAY);
};

export const changeScreen = (element) => {
  mainEl.innerHTML = ``;
  mainEl.appendChild(element);
};

export const appendModal = (element) => document.body.appendChild(element);

export const createElementWith = (...elements) => {
  const wrapper = document.createElement(CONTAINER_TAG);
  elements.forEach((element) => wrapper.appendChild(element));
  return wrapper;
};
