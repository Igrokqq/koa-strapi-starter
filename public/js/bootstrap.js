/* eslint-disable no-undef */
window.onload = function () {
  const { MODULES } = window;

  if (MODULES.size) {
    MODULES.forEach((module) => module.init());
  }
};
