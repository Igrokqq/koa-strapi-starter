const CompanyService = require('../company/company.service');
const StudentService = require('../student/student.service');
const authConstants = require('./auth.constants');
const createStudentDto = require('../student/dto/create.dto');

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
    createStudentDto.validate(ctx.request.body);

    await StudentService.create(ctx.request.body);

    ctx.redirect('/login');
  },

  logout(ctx) {
    global.user = null;
    ctx.logout();
    ctx.redirect('/login');
  },
};
