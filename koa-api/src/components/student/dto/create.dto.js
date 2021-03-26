const Joi = require('joi');

const schema = Joi.object({
    name: Joi.string().required(),
    surname: Joi.string().required(),
    company: Joi.any().required(), // @todo ObjectId validation plugin for joi
    isAdmin: Joi.boolean().optional(),
    password: Joi.string().required().min(8).max(64),
    email: Joi.string().email().required()
});

module.exports = {
    isValid(body) {
        return schema.validate(body);
    }
}