const CompanyModel = require('./company.model');

module.exports = {
  create(body) {
    return CompanyModel.create(body);
  },
};
