const ProjectService = require('../project/project.service');

module.exports = {
  async index(ctx) {
    await ctx.render('home', {
      layout: 'layouts/base',
      errors: ctx.flash.errors,
      data: {
        projects: await ProjectService.getAllByCompany(ctx.state?.user?.company._id),
      },
    });
  },

  ping(ctx) {
    ctx.body = 'Hello world!';
  },
};
