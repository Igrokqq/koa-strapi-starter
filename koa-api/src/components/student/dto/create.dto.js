const ValidationException = require('../../../exceptions/validation.exception');

const { validator } = global;
const schema = validator.object({
  name: validator.string().required(),
  surname: validator.string().required(),
  company: validator.any().required(),
  isAdmin: validator.boolean().optional(),
  password: validator.string().required().min(8).max(64),
  email: validator.string().email().required(),
});

module.exports = {
  validate(body) {
    const { error } = schema.validate(body);

    if (error) {
      throw new ValidationException(error);
    }
  },
};
