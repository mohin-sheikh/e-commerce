const Joi = require('joi').extend(require('@joi/date'));

exports.userCreation = Joi.object({
    first_name: Joi.string().lowercase().trim().min(3).max(30).required(),
    last_name: Joi.string().lowercase().trim().min(3).max(30).required(),
    email: Joi.string().trim().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'in', 'io'] } }),
    address: Joi.string().lowercase().trim().min(3).max(300).required(),
    gender: Joi.string().trim().required().lowercase().valid(...['male', 'female', 'other']),
    country_code: Joi.string().trim().lowercase().min(2).max(4).required(),
    mobile_number: Joi.string().trim().regex(/^[0-9]{10}$/).messages({ 'string.pattern.base': `Phone number must have 10 digits.` }).required(),
    password: Joi.string().trim().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    confirm_pass: Joi.ref('password'),
});

exports.verifyUser = Joi.object({
    email: Joi.string().trim().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'in', 'io'] } }),
    mobile_number: Joi.string().trim().regex(/^[0-9]{10}$/).messages({ 'string.pattern.base': `Phone number must have 10 digits.` }),
    country_code: Joi.string().trim().lowercase().min(2).max(4).when('mobile_number', { then: Joi.required(), otherwise: Joi.optional() }),
    otp: Joi.string().trim().required()
}).or("email", "mobile_number");

exports.login = Joi.object({
    email: Joi.string().trim().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'in', 'io'] } }),
    mobile_number: Joi.string().trim().regex(/^[0-9]{10}$/).messages({ 'string.pattern.base': `Phone number must have 10 digits.` }),
    country_code: Joi.string().trim().lowercase().min(2).max(4).when('mobile_number', { then: Joi.required(), otherwise: Joi.optional() }),
    password: Joi.string().trim().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
}).or("email", "mobile_number");

exports.login2FA = Joi.object({
    email: Joi.string().trim().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'in', 'io'] } }),
    mobile_number: Joi.string().trim().regex(/^[0-9]{10}$/).messages({ 'string.pattern.base': `Phone number must have 10 digits.` }),
    country_code: Joi.string().trim().lowercase().min(2).max(4).when('mobile_number', { then: Joi.required(), otherwise: Joi.optional() }),
    otp: Joi.string().trim().required()
}).or("email", "mobile_number");

