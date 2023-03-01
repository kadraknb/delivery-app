const joi = require('joi');

const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
}).messages({
  'string.empty': '{#label} is required',
  'string.base': '{#label} needs to be a string',
  'string.email': 'email incorrect',
  'string.min': 'password length must be at least {#limit} characters long',
});

const createUserSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
  role: joi.string().required(),
}).messages({
  'string.empty': '{#label} is required',
  'string.base': '{#label} needs to be a string',
  'string.email': 'email incorrect',
  'string.min': 'password length must be at least {#limit} characters long',
});

module.exports = { loginSchema, createUserSchema };