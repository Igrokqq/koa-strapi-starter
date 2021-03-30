const ValidationException = require('../../../exceptions/validation.exception');

const { validator } = global;
const schema = validator.object({
  companyId: validator.objectId().required(),
});

module.exports = {
  validate(params) {
    const { error } = schema.validate(params);

    if (error) {
      throw new ValidationException(error);
    }
  },
};
