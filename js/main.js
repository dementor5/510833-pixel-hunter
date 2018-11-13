'use strict';
(function () {
  const LEFT_KEYCODE = 37;
  const RIGHT_KEYCODE = 39;
  const FIRST_ARRAY_INDEX = 0;
  const bodyEl = document.body;
  const mainEl = document.querySelector(`#main`);
  const introTemplate = document.querySelector(`#intro`);
  const greetingTemplate = document.querySelector(`#greeting`);
  const rulesTemplate = document.querySelector(`#rules`);
  const game1Template = document.querySelector(`#game-1`);
  const game2Template = document.querySelector(`#game-2`);
  const game3Template = document.querySelector(`#game-3`);
  const statsTemplate = document.querySelector(`#stats`);
  const modalErrorTemplate = document.querySelector(`#modal-error`);
  const modalConfirmTemplate = document.querySelector(`#modal-confirm`);
  const arrowBeforeClass = `arrow__btn--before`;
  const arrrowAfterClass = `arrow__btn--after`;
  const arrowsHTMLCode =
  `<div class="arrows__wrap">
    <style>
      .arrows__wrap {
        position: absolute;
        top: 95px;
        left: 50%;
        margin-left: -56px;
      }
      .arrows__btn {
        background: none;
        border: 2px solid black;
        padding: 5px 20px;
      }
    </style>
    <button class="arrows__btn ${arrowBeforeClass}"><-</button>
    <button class="arrows__btn ${arrrowAfterClass}">-></button>
  </div>`;
  const templates = [
    introTemplate,
    greetingTemplate,
    rulesTemplate,
    game1Template,
    game2Template,
    game3Template,
    statsTemplate,
    modalErrorTemplate,
    modalConfirmTemplate
  ];
  const lastScreenNumber = getLastArrayIndex(templates);
  let currentScreen = FIRST_ARRAY_INDEX;

  appendArrowsOnPage();
  addGlobalListener();
  renderScreen(currentScreen);

  function getLastArrayIndex(array) {
    return array.length - 1;
  }

  function appendArrowsOnPage() {
    const template = document.createElement(`template`);
    template.innerHTML = arrowsHTMLCode;
    const arrowsWrapEl = template.content.firstChild;

    addListenersOnArrowsWrapEl(arrowsWrapEl);
    bodyEl.appendChild(arrowsWrapEl);
  }

  function addListenersOnArrowsWrapEl(el) {
    el.addEventListener(`click`, (evt) => {
      const classList = evt.target.classList;

      if (classList.contains(arrowBeforeClass)) {
        renderPreviosScreen();
      } else if (classList.contains(arrrowAfterClass)) {
        renderNextScreen();
      }
    });
  }

  function addGlobalListener() {
    document.addEventListener(`keydown`, (evt) => {
      switch (evt.keyCode) {
        case LEFT_KEYCODE:
          renderPreviosScreen();
          break;
        case RIGHT_KEYCODE:
          renderNextScreen();
          break;
      }
    });
  }

  function renderPreviosScreen() {
    if (currentScreen > FIRST_ARRAY_INDEX) {
      renderScreen(--currentScreen);
    }
  }

  function renderNextScreen() {
    if (currentScreen < lastScreenNumber) {
      renderScreen(++currentScreen);
    }
  }

  function renderScreen(number) {
    const templateInnerEls = getCopyTemplateInnerEls(templates[number]);
    const filledFragment = getFilledFragment(templateInnerEls);
    replaceChild(mainEl, filledFragment);
  }

  function getCopyTemplateInnerEls(template) {
    const content = template.content;
    const els = [];

    for (let i = 0; i < content.childElementCount; i++) {
      els.push(content.children[i].cloneNode(true));
    }

    return els;
  }

  function getFilledFragment(els) {
    const fragment = document.createDocumentFragment();
    els.forEach((el) => fragment.appendChild(el));
    return fragment;
  }

  function replaceChild(el, fragment) {
    removeChildEls(el);
    el.appendChild(fragment);
  }

  function removeChildEls(el) {
    let children = el.children;
    if (children.length) {
      children = convertToArray(children);
      children.forEach((it) => it.remove());
    }
  }

  function convertToArray(collection) {
    return Array.prototype.slice.call(collection);
  }
})();
