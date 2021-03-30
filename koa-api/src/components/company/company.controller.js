const companyCreateDto = require('./dto/company-create.dto');
const CompanyService = require('./company.service');

module.exports = {
  async create(ctx) {
    const body = {
      ...ctx.request.body,
      logo: ctx.request.files.logo,
    };
    companyCreateDto.validate(body);

    ctx.response.body = await CompanyService.create(body);
  },
};
