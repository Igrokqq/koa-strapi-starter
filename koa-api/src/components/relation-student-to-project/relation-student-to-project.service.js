const ProjectRepository = require('../project/project.repository');
const RelationStudentToProjectRepository = require('./relation-student-to-project.repository');
const ConflictException = require('../../exceptions/conflict.exception');
const ValidationException = require('../../exceptions/validation.exception');

module.exports = {
  async create({ project: projectId, user: student }) {
    const studentHasThisProject = await RelationStudentToProjectRepository.studentHasProject(
      projectId,
      student._id,
    );

    if (studentHasThisProject) {
      throw new ConflictException('Student already has this project');
    }

    const project = await ProjectRepository.getById(projectId);

    if (project && student.company._id.equals(project.company)) {
      return RelationStudentToProjectRepository.create({
        project: project._id,
        student: student._id,
      });
    }

    throw new ValidationException('Student can join only to project which belong to the same company');
  },
};
