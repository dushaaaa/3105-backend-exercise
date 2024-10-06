const Joi = require('joi');

const registerSchema = Joi.object({
    username: Joi.string().required().messages({
        'string.empty': 'Username is required',
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'Password must be at least 6 characters long',
        'string.empty': 'Password is required',
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'Please provide a valid email address',
        'string.empty': 'Email is required',
    })
});

const loginSchema = Joi.object({
    username: Joi.string().required().messages({
        'string.empty': 'Username is required',
    }),
    password: Joi.string().required().messages({
        'string.empty': 'Password is required',
    }),
});

module.exports = { registerSchema, loginSchema };
