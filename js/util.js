const mainEl = document.querySelector(`#main`);
const removeDelay = 2000;

export function render(template = ``) {
  const wrapper = document.createElement(`div`);
  wrapper.innerHTML = template.trim();
  return wrapper.firstChild;
}

export function crossfadeChangeScreen(element) {
  const previosScreen = mainEl.firstElementChild;
  previosScreen.classList.add(`crossfade`, `crossfade--hide`);
  element.classList.add(`crossfade`, `crossfade--show`);
  mainEl.appendChild(element);
  setTimeout(() => {
    previosScreen.remove();
  }, removeDelay);
}

export function changeScreen(element) {
  mainEl.innerHTML = ``;
  mainEl.appendChild(element);
}

export function appendModal(element) {
  document.body.appendChild(element);
}
