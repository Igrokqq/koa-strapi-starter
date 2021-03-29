const Joi = require('joi');

const schema = Joi.object({
  companyId: Joi.any().optional(), // @todo objectId validation plugin for Joi
});

module.exports = {
  isValid(params) {
    return schema.validate(params);
  },
};
