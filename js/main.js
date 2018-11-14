'use strict';
(function () {
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
  const lastScreenNumber = window.util.getLastArrayIndex(templates);
  let currentScreen = window.util.FIRST_ARRAY_INDEX;

  appendArrowsOnPage();
  addGlobalListener();
  renderScreen(currentScreen);

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
        case window.util.LEFT_KEYCODE:
          renderPreviosScreen();
          break;
        case window.util.RIGHT_KEYCODE:
          renderNextScreen();
          break;
      }
    });
  }

  function renderPreviosScreen() {
    if (currentScreen > window.util.FIRST_ARRAY_INDEX) {
      currentScreen--;
      renderScreen(currentScreen);
    }
  }

  function renderNextScreen() {
    if (currentScreen < lastScreenNumber) {
      currentScreen++;
      renderScreen(currentScreen);
    }
  }

  function renderScreen(number) {
    const template = templates[number];
    const innerEls = window.util.getCopyTemplateInnerEls(template);
    const filledFragment = window.util.getFilledFragment(innerEls);
    window.util.replaceChild(mainEl, filledFragment);
  }
})();
