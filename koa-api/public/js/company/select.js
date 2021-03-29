{
/* eslint-disable no-undef */
  const Module = function () {
    const selects = Array.from(document.getElementsByClassName('companiesSelect'));
    const studentsTableCompanySelect = document.getElementById('studentsTableCompanySelect');
    const ENDPOINTS = {
      GET_COMPANIES: '/companies'
    };

    const getCompanies = function () {
      return fetch(ENDPOINTS.GET_COMPANIES).then((response) => response.json());
    };

    const transformToRow = (company) => {
      return `<option value=${company.id}>${company.title}</option>`;
    };

    const appendCompaniesHtml = (selects = [], html = '') => {
      selects.forEach((select) => (select.innerHTML += html));
    };

    const onChange = function ({ target: { value: companyId } }) {
      document.body.dispatchEvent(new CustomEvent(
        EVENTS.ON_STUDENTS_TABLE_CHANGE,
        {
          detail: {
            companyId
          }
        })
      );
    };
    const onInit = function () {
      getCompanies()
        .then((companies) => {
          appendCompaniesHtml(selects, companies.map(transformToRow).join());
        })
        .catch(console.error);
    };
    return {
      init() {
        onInit();
        studentsTableCompanySelect.addEventListener('change', onChange);
      }
    };
  };

  window.MODULES.set('CompanySelectModule', Module());
}