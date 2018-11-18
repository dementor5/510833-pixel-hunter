const mainEl = document.querySelector(`#main`);

function changeScreen(el) {
  if (mainEl.children.length) {
    mainEl.innerHTML = ``;
  }
  mainEl.appendChild(el);
}

function getElementFromTemplate(template) {
  const wrapper = document.createElement(`div`);
  wrapper.innerHTML = template.trim();
  return wrapper;
}

export {
  getElementFromTemplate,
  changeScreen
};
