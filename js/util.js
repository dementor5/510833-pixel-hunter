'use strict';
(function () {
  const FIRST_ARRAY_INDEX = 0;

  function getLastArrayIndex(array) {
    return array.length - 1;
  }

  function getFixedFragment(template) {
    const content = template.content.cloneNode(true);
    const children = Array.from(content.children);
    const fragment = document.createDocumentFragment();
    children.forEach((it) => fragment.appendChild(it));
    return fragment.cloneNode(true);
  }

  function replaceChilds(el, childEl) {
    if (el.children.length) {
      el.innerHTML = ``;
    }
    el.appendChild(childEl);
  }

  function getElFromStr(string) {
    const div = document.createElement(`div`);
    div.innerHTML = string;
    return div.firstChild;
  }

  window.util = {
    FIRST_ARRAY_INDEX,
    getLastArrayIndex,
    getFixedFragment,
    replaceChilds,
    getElFromStr
  };
})();
