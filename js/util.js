const mainEl = document.querySelector(`#main`);

export function render(template = ``) {
  const wrapper = document.createElement(`div`);
  wrapper.innerHTML = template.trim();
  return wrapper.firstChild;
}

export function replaceScreenElements(...elements) {
  if (mainEl.children.length) {
    mainEl.innerHTML = ``;
  }

  const fragment = document.createDocumentFragment();
  elements.forEach((element) => fragment.appendChild(element));
  mainEl.appendChild(fragment);
}
