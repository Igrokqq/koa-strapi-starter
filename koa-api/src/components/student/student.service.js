const bcrypt = require('bcrypt');
const studentConstants = require('./student.constants');
const StudentRepository = require('./student.repository');

module.exports = {
  async create({ password, ...body }) {
    const encryptedPassword = await bcrypt.hash(password, studentConstants.passwordSalt);

    return StudentRepository.create({
      ...body,
      password: encryptedPassword,
    });
  },

  getAllByCompany(params) {
    return StudentRepository.getAllByCompany(params);
  },

  getCompanyAdmins(params) {
    return StudentRepository.getCompanyAdmins(params);
  },

  getCompanySimpleStudents(params) {
    return StudentRepository.getCompanySimpleStudents(params);
  },

  getByEmail(email) {
    return StudentRepository.getByEmail(email);
  },

  getById(id) {
    return StudentRepository.getById(id);
  },
};
