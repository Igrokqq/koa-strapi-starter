const createDto = require('./dto/create.dto');
const RelationStudentToProjectService = require('./relation-student-to-project.service');

module.exports = {
  async create(ctx) {
    createDto.validate(ctx.request.body);

    await RelationStudentToProjectService.create({
      ...ctx.request.body,
      user: ctx.state.user,
    });

    ctx.redirect('back');
  },
};
