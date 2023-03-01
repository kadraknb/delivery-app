const joi = require('joi');

const loiginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
}).messages({
  'string.empty': '{#label} is required',
  'string.base': '{#label} needs to be a string',
  'string.email': 'email incorrect',
  'string.min': 'password length must be at least {#limit} characters long',
});

module.exports = { loiginSchema };