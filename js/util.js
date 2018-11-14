'use strict';
(function () {
  const FIRST_ARRAY_INDEX = 0;

  function getLastArrayIndex(array) {
    return array.length - 1;
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

  function replaceChilds(el, childEl) {
    if (el.children.length) {
      el.innerHTML = ``;
    }
    el.appendChild(childEl);
  }

  window.util = {
    FIRST_ARRAY_INDEX,
    getLastArrayIndex,
    getCopyTemplateInnerEls,
    getFilledFragment,
    replaceChilds
  };
})();
