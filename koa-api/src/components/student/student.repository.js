const UtilService = require('../../shared/util.service');
const StudentModel = require('./student.model');

module.exports = {
  create(body) {
    return StudentModel.create({
      ...body,
      company: UtilService.toObjectID(body.company),
    });
  },

  getAllByCompany({ companyId }) {
    return StudentModel.find({
      company: UtilService.toObjectID(companyId),
    }).lean().exec();
  },

  getCompanyAdmins({ companyId }) {
    return StudentModel.find({
      company: UtilService.toObjectID(companyId),
      isAdmin: true,
    }).lean().exec();
  },

  getCompanySimpleStudents({ companyId }) {
    return StudentModel.find({
      company: UtilService.toObjectID(companyId),
      isAdmin: false,
    }).lean().exec();
  },

  getByEmail(email) {
    return StudentModel.findOne({
      email,
    }).lean().exec();
  },

  getById(id) {
    return StudentModel.findOne({
      _id: UtilService.toObjectID(id),
    }).lean().exec();
  },
};
