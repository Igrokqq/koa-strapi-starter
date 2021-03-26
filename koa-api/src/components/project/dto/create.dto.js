const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().required(),
  company: Joi.any().required(), // @todo create ObjectId plugin for validation with joi
});

module.exports = {
    isValid(value) {
        return schema.validate(value);
    }
}