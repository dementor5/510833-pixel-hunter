const mainEl = document.querySelector(`#main`);

export function render(template = ``) {
  const wrapper = document.createElement(`div`);
  wrapper.innerHTML = template.trim();
  return wrapper;
}

export function getElement(string) {
  const wrapper = document.createElement(`div`);
  wrapper.innerHTML = string.trim();
  return wrapper.firstChild;
}

export function getFragmentWithChildren(element) {
  const children = Array.from(element.children);
  const fragment = document.createDocumentFragment();
  children.forEach((it) => fragment.appendChild(it));
  return fragment;
}

export function changeScreen(el) {
  if (mainEl.children.length) {
    mainEl.innerHTML = ``;
  }
  mainEl.appendChild(el);
}
