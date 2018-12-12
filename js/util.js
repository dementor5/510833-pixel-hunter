const mainEl = document.querySelector(`#main`);

export function render(template = ``) {
  const wrapper = document.createElement(`div`);
  wrapper.innerHTML = template.trim();
  return wrapper.firstChild;
}

export function changeScreen(element) {
  mainEl.innerHTML = ``;
  mainEl.appendChild(element);
}
