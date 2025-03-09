const Joi = require("joi");

// Validation schemas
const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  firstName: Joi.string().min(2).max(50).required(),
  lastName: Joi.string().min(2).max(50).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  confirmationCode: Joi.number().required(),
});

const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

const sendVerificationSchema = Joi.object({
  email: Joi.string().email().required(),
});



module.exports = { 
  registerSchema, 
  loginSchema, 
  refreshTokenSchema, 
  sendVerificationSchema 
};
