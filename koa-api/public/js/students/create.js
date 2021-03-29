{
  /* eslint-disable no-undef */
  const Module = function () {
    const createStudentForm = document.getElementById('createStudentForm');
    const inputs = {
      companyId: document.getElementById('studentCompany'),
      name: document.getElementById('studentNameInput'),
      surname: document.getElementById('studentSurnameInput'),
      isAdmin: document.getElementById('studentIsAdminInput')
    };
    const ENDPOINTS = {
      CREATE_STUDENT: '/students'
    };

    const sendCreateStudentRequest = function () {
      const urlencoded = new URLSearchParams();
      urlencoded.append('company', parseInt(inputs.companyId.value, 10));
      urlencoded.append('name', inputs.name.value);
      urlencoded.append('surname', inputs.surname.value);
      urlencoded.append('isAdmin', inputs.isAdmin.checked);

      return fetch(ENDPOINTS.CREATE_STUDENT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: urlencoded
      }).then((response) => {
        if (response.ok) {
          return response.json();
        }

        return Promise.reject(response);
      });
    };

    const onSubmit = function (event) {
      event.preventDefault();

      sendCreateStudentRequest().then(() => {
        window.location.reload();
      }).catch(console.error);
    };

    return {
      init() {
        createStudentForm.addEventListener('submit', onSubmit);
      }
    };
  };

  window.MODULES.set('StudentCreateModule', Module());
}