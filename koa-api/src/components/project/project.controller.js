const createProjectDto = require('./dto/create.dto');
const getAllByCompanyDto = require('./dto/get-all-by-company.dto');
const ProjectService = require('./project.service');

module.exports = {
  async create(ctx) {
    createProjectDto.validate(ctx.request.body);

    ctx.response.body = await ProjectService.create(ctx.request.body);
  },

  async getAllByCompany(ctx, companyId) {
    const params = {
      companyId,
    };
    getAllByCompanyDto.validate(params);

    ctx.response.body = await ProjectService.getAllByCompany(params.companyId);
  },
};
