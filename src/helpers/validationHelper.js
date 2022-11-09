const Joi = require("joi");

const addEmailValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  });
  return schema.validate(data);
};

const OTPValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    OTP: Joi.number().required(),
  });
  return schema.validate(data);
};

const updateUserDataValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    full_name: Joi.string().required(),
    user_name: Joi.string().required(),
    password: Joi.string().required(),
  });
  return schema.validate(data);
};

module.exports = {
  addEmailValidation,
  OTPValidation,
  updateUserDataValidation,
  loginValidation,
};
