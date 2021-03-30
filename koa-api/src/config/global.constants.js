const moment = require('moment');
const mongoConnection = require('./mongo');
const Validator = require('../shared/validator');

module.exports = {
  init() {
    global.databases = {};
    global.databases.mongo = mongoConnection;
    global.moment = moment;
    global.validator = Validator;
    global.user = null;
  },
};
