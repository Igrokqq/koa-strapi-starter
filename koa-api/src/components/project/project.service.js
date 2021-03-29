const ProjectRepository = require('./project.repository');

module.exports = {
  create(body) {
    return ProjectRepository.create(body);
  },
};
