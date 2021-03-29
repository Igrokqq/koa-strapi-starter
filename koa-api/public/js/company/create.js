{
  /* eslint-disable no-undef */
  const Module = function () {
    const form = document.getElementById('createCompanyForm');
    const inputs = {
      title: document.getElementById('companyTitleInput'),
      address: document.getElementById('companyAddressInput'),
      description: document.getElementById('companyDescriptionInput'),
      logo: document.getElementById('companyLogoInput')
    };
    const ENDPOINTS = {
      CREATE_COMPANY: '/companies',
      UPLOAD_COMPANY_LOGO: '/upload'
    };
    const COMPANY_LOGO_FIELD_NAME = 'logo';
    const COMPANY_CONTENT_TYPE = 'companies';

    const sendCreateCompanyRequest = function (payload) {
      const urlencoded = new URLSearchParams();
      urlencoded.append('title', payload.title);
      urlencoded.append('description', payload.description);
      urlencoded.append('address', payload.address);

      return fetch(ENDPOINTS.CREATE_COMPANY, {
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
    const sendUploadCompanyLogoRequest = function (payload) {
      const formData = new FormData();
      formData.append('ref', COMPANY_CONTENT_TYPE);
      formData.append('refId', payload.refId);
      formData.append('files', payload.files);
      formData.append('field', COMPANY_LOGO_FIELD_NAME);

      return fetch(ENDPOINTS.UPLOAD_COMPANY_LOGO, {
        method: 'POST',
        body: formData,
        redirect: 'follow'
      }).then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(response);
      });
    };
    const onSubmit = function (event) {
      event.preventDefault();

      sendCreateCompanyRequest({
        title: inputs.title.value,
        description: inputs.description.value,
        address: inputs.address.value
      }).then((company) => {
        sendUploadCompanyLogoRequest({
          files: inputs.logo.files[0],
          refId: company.id,
        }).then(() => {
          window.location.reload();
        }).catch(console.error);
      }).catch(console.error);
    };

    return {
      init() {
        form.addEventListener('submit', onSubmit);
      }
    };
  };

  window.MODULES.set('CompanyCreateModule', Module());
}