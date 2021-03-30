const ProjectRepository = require('./project.repository');

module.exports = {
  create(body) {
    return ProjectRepository.create(body);
  },

  getAllByCompany(companyId) {
    return ProjectRepository.getAllByCompany(companyId);
  },
};
