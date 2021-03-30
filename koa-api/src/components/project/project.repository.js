const { toObjectID } = require('../../shared/util.service');
const ProjectModel = require('./project.model');

module.exports = {
  create(body) {
    return ProjectModel.create({
      ...body,
      company: toObjectID(body.company),
    });
  },

  getAllByCompany(companyId) {
    return ProjectModel.find({
      company: toObjectID(companyId),
    }).lean().exec();
  },

  getById(projectId) {
    return ProjectModel.findOne({
      _id: toObjectID(projectId),
    }).lean().exec();
  },
};
