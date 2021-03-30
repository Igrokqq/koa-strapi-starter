const createStudentDto = require('./dto/create.dto');
const getAllByCompanyDto = require('./dto/get-all-by-company.dto');
const StudentService = require('./student.service');

module.exports = {
  async profilePage(ctx) {
    await ctx.render('profile/index', {
      data: {
        user: ctx.state.user,
      },
    });
  },

  async profileCompanyDetailsPage(ctx) {
    await ctx.render('profile/company/details', {
      data: {
        user: ctx.state.user,
      },
    });
  },

  async create(ctx) {
    createStudentDto.validate(ctx.request.body);

    ctx.response.body = await StudentService.create(ctx.request.body);
  },

  async getAllByCompany(ctx, companyId) {
    const params = {
      companyId,
    };
    getAllByCompanyDto.validate(params);

    ctx.response.body = await StudentService.getAllByCompany(params);
  },

  async getCompanyAdmins(ctx, companyId) {
    const params = {
      companyId,
    };
    getAllByCompanyDto.validate(params);

    ctx.response.body = await StudentService.getCompanyAdmins(params);
  },

  async getCompanySimpleStudents(ctx, companyId) {
    const params = {
      companyId,
    };
    getAllByCompanyDto.validate(params);

    ctx.response.body = await StudentService.getCompanySimpleStudents(params);
  },
};
