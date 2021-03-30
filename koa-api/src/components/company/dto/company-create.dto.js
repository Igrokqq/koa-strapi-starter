const ValidationException = require('../../../exceptions/validation.exception');

const { validator } = global;
const { ALLOWED_LOGO_MIME_TYPES } = require('../company.constants');

const schema = validator.object({
  title: validator.string().required(),
  description: validator.string().required(),
  address: validator.string().required(),
  logo: validator.object({
    type: validator.string().valid(...ALLOWED_LOGO_MIME_TYPES),
  }).options({ allowUnknown: true }),
});

module.exports = {
  validate(body) {
    const { error } = schema.validate(body);

    if (error) {
      throw new ValidationException(error);
    }
  },
};
