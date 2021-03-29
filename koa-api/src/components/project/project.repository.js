const UtilService = require('../../shared/util.service');
const ProjectModel = require('./project.model');

module.exports = {
  create(body) {
    return ProjectModel.create({
      ...body,
      company: UtilService.toObjectID(body.company),
    });
  },
};
