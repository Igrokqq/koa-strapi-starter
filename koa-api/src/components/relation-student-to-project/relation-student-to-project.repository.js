const { toObjectID } = require('../../shared/util.service');
const RelationStudentToProjectModel = require('./relation-student-to-project.model');

module.exports = {
  create(body) {
    return RelationStudentToProjectModel.create(body);
  },

  async studentHasProject(projectId, studentId) {
    const project = await RelationStudentToProjectModel.findOne({
      project: toObjectID(projectId),
      student: toObjectID(studentId),
    });

    return !!project;
  },
};
