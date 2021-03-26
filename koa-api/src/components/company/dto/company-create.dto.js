const joi = require('joi');
const { ALLOWED_LOGO_MIME_TYPES } = require('../company.constants');

const schema = joi.object({
    title: joi.string().required(),
    description: joi.string().required(),
    address: joi.string().required(),
    logo: joi.object({
      type: joi.string().valid(...ALLOWED_LOGO_MIME_TYPES),
    }).options({ allowUnknown: true })
});

module.exports = {
    isValid(body) {
      return schema.validate(body);
    }
}