const mongoConnection = require('./mongo');

module.exports = {
  init() {
    global.databases = {};
    global.databases.mongo = mongoConnection;
  },
};
