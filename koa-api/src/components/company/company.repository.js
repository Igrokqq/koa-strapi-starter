const CompanyModel = require('./company.model');
const { toObjectID } = require('../../shared/util.service');

module.exports = {
  create(body) {
    return CompanyModel.create(body);
  },

  getAll() {
    return CompanyModel.find().exec();
  },

  getById(id) {
    return CompanyModel.findOne({
      _id: toObjectID(id),
    }).exec();
  },
};
