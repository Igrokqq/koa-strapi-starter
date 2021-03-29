const CompanyService = require('../company/company.service');
const StudentService = require('../student/student.service');
const authConstants = require('./auth.constants');
const createStudentDto = require('../student/dto/create.dto');
const ValidationException = require('../../exceptions/validation.exception');

module.exports = {
  async signUpPage(ctx) {
    await ctx.render(authConstants.PAGES.SIGN_UP, {
      layout: 'layouts/base',
      data: {
        companies: await CompanyService.getAll(),
      },
    });
  },

  async signInPage(ctx) {
    await ctx.render(authConstants.PAGES.SIGN_IN, {
      layout: 'layouts/base',
    });
  },

  async signUp(ctx) {
    const { error } = createStudentDto.isValid(ctx.request.body);

    if (error) {
      throw new ValidationException(error);
    }

    await StudentService.create(ctx.request.body);

    ctx.redirect('/');
  },
};
