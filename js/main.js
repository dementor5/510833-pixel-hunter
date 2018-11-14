'use strict';
(function () {
  const mainEl = document.querySelector(`#main`);
  const templates = [
    `intro`,
    `greeting`,
    `rules`,
    `game-1`,
    `game-2`,
    `game-3`,
    `stats`
  ].map((it) => document.querySelector(`#` + it));
  const lastScreenNumber = window.util.getLastArrayIndex(templates);
  let currentScreenNumber = window.util.FIRST_ARRAY_INDEX;
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

  addGlobalListener();
  renderScreen(currentScreenNumber);
  appendArrowsOnPage();

  function addGlobalListener() {
    document.addEventListener(`keydown`, (evt) => {
      switch (evt.code) {
        case `ArrowLeft`:
          renderPreviosScreen();
          break;
        case `ArrowRight`:
          renderNextScreen();
          break;
      }
    });
  }

  function renderPreviosScreen() {
    if (currentScreenNumber > window.util.FIRST_ARRAY_INDEX) {
      const previosScreenNumber = currentScreenNumber - 1;
      renderScreen(previosScreenNumber);
    }
  }

  function renderNextScreen() {
    if (currentScreenNumber < lastScreenNumber) {
      const nextScreenNumber = currentScreenNumber + 1;
      renderScreen(nextScreenNumber);
    }
  }

  function renderScreen(screenNumber) {
    const template = templates[screenNumber];
    const innerEls = window.util.getCopyTemplateInnerEls(template);
    const filledFragment = window.util.getFilledFragment(innerEls);
    window.util.replaceChilds(mainEl, filledFragment);
    currentScreenNumber = screenNumber;
  }

  function appendArrowsOnPage() {
    const template = document.createElement(`template`);
    template.innerHTML = arrowsHTMLCode;
    const arrowsWrapEl = template.content.firstChild;

    addListenersOnArrowsWrapEl(arrowsWrapEl);
    document.body.appendChild(arrowsWrapEl);
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
})();
