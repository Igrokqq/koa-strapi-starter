const mongoConnection = require('../config/mongo');

module.exports = {
    init() {
        global.databases = {};
        global.databases.mongo = mongoConnection;
    }
}