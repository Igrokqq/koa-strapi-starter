{
  /* eslint-disable no-undef */
  const Module = function () {
    const onInit = function () {
      window.EVENTS = {
        ON_STUDENTS_TABLE_CHANGE: 'onStudentsTableChange'
      };
    };
    return {
      init() {
        onInit();
      }
    };
  };
  window.MODULES = new Map();
  window.MODULES.set('GlobalsModule', Module());
}