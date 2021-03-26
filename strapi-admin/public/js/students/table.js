{
/* eslint-disable no-undef */
  const Module = function () {
    const tableBody = document.getElementById('companyStudentsTableBody');
    const ENDPOINTS = {
      GET_STUDENTS: '/students'
    };
    const STUDENT_DELETE_BUTTON_CLASS_NAME = 'studentDeleteButton';

    const getStudents = function () {
      return fetch(ENDPOINTS.GET_STUDENTS).then((response) => response.json());
    };

    const filterByCompanyId = function (students, companyId) {
      return students.filter((student) => {
        if (student.company) {
          return student.company.id === companyId;
        }

        return false;
      });
    };

    const transformToRow = function (student, index = 0) {
      return `<tr data-student-id="${student.id}">
        <th>${index}</th>
        <td>${student.name}</td>
        <td>${student.surname}</td>
        <td>${student.isAdmin ? 'TRUE' : 'FALSE'}</td>
        <td><button type="button" class="btn btn-primary ${STUDENT_DELETE_BUTTON_CLASS_NAME}" data-student-id="${student.id}">Delete</button></td>
      </tr>`;
    };

    const sendDeleteStudentRequest = function ({ studentId }) {
      return fetch(`/students/${studentId}`, {
        method: 'DELETE',
      }).then((response) => {
        if (response.ok) {
          return response.json();
        }

        return Promise.reject(response);
      });
    };

    const removeAllBySelector = function (selector = '') {
      if (selector) {
        document.querySelectorAll(selector).forEach((node) => node.remove());
      }
    };

    const onStudentDelete = function ({ target }) {
      const studentId = parseInt(target.getAttribute('data-student-id'), 10);

      sendDeleteStudentRequest({
        studentId
      }).then(() => {
        removeAllBySelector(`tr[data-student-id="${studentId}"]`);
      }).catch(console.error);
    };

    return {
      init() {
        document.body.addEventListener(window.EVENTS.ON_STUDENTS_TABLE_CHANGE, ({ detail: { companyId }}) => {
          getStudents()
            .then((students) => {
              tableBody.innerHTML = filterByCompanyId(students, parseInt(companyId, 10))
                .map((student, index) => transformToRow(student, index + 1))
                .join('');

              document.querySelectorAll(`.${STUDENT_DELETE_BUTTON_CLASS_NAME}`).forEach((button) => button.addEventListener('click', onStudentDelete));
            })
            .catch(console.error);
        });
      }
    };
  };

  window.MODULES.set('StudentsTableModule', Module());
}