const Joi = require("joi");
const strongPasswordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
const stringPassswordError = new Error(
  "Password must be strong. At least one upper case alphabet. At least one lower case alphabet. At least one digit. At least one special character. Minimum eight in length"
);
const addEmailValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().alphanum().min(8).required(),
  });
  return schema.validate(data);
};

const signUpGoogleValidation = (data) => {
  const schema = Joi.object({
    clientID: Joi.string().required(),
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
    password: Joi.string()
      .regex(strongPasswordRegex)
      .error(stringPassswordError)
      .required(),
  });
  return schema.validate(data);
};

const usernameValidation = (data) => {
  const schema = Joi.object({
    user_name: Joi.string().required(),
  });
  return schema.validate(data);
};

module.exports = {
  addEmailValidation,
  OTPValidation,
  updateUserDataValidation,
  loginValidation,
  signUpGoogleValidation,
  usernameValidation,
};
