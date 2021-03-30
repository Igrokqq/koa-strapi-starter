const { isValidObjectID } = require('../../util.service');

module.exports = {
  type: 'objectId',
  messages: {
    'objectId.base': 'Argument passed in must be a single String of 12 bytes or a string of 24 hex characters',
  },
  validate(value, helpers) {
    if (!isValidObjectID(value)) {
      return {
        value,
        errors: helpers.error('objectId.base'),
      };
    }
    return {
      value,
    }; // Keep the value as it was
  },
};
