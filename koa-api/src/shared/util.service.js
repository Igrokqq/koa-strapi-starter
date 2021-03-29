const { ObjectID } = require('mongodb');

module.exports = {
  toObjectID(value) {
    if (ObjectID.isValid(value)) {
      return value;
    }

    return new ObjectID(value);
  },
};
