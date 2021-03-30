const ValidationException = require('../../../exceptions/validation.exception');

const { validator } = global;
const schema = validator.object({
  project: validator.objectId().required(),
});

module.exports = {
  validate(value) {
    const { error } = schema.validate(value);

    if (error) {
      throw new ValidationException(error);
    }
  },
};
