const Joi = require('joi');
const strongPasswordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
const stringPassswordError = new Error(
  'Password must be strong. At least one upper case alphabet. At least one lower case alphabet. At least one digit. At least one special character. Minimum eight in length'
);
const addEmailValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    userIdentifier: Joi.string().required(),
    password: Joi.string().required(),
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
    phone_number: Joi.string().optional(),
    password: Joi.string().regex(strongPasswordRegex).error(stringPassswordError).required(),
  });
  return schema.validate(data);
};

const usernameValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().required(),
  });
  return schema.validate(data);
};

const getCities = (data) => {
  const schema = Joi.object({
    province: Joi.string().required(),
  });
  return schema.validate(data);
};

const getCitiesName = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
  });
  return schema.validate(data);
};

const postUserProfileData = (data) => {
  const schema = Joi.object({
    province: Joi.string().required(),
    city: Joi.string().required(),
    connectId: Joi.array().required(),
  });
  return schema.validate(data);
};

const resetPassValidation = (data) => {
  const schema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().email().required(),
  });
  return schema.validate(data);
};

const createPostTextValidation = (data) => {
  const schema = Joi.object({
    postText: Joi.string().required(),
    location: Joi.string().required(),
    location_detail: Joi.string().optional().allow(''),
    categories: Joi.array().required(),
  });
  return schema.validate(data);
};

const likePostValidation = (data) => {
  const schema = Joi.object({
    postId: Joi.string().required(),
  });
  return schema.validate(data);
};

const createCommentTextValidation = (data) => {
  const schema = Joi.object({
    commentText: Joi.string().required(),
    postId: Joi.number().required(),
  });
  return schema.validate(data);
};

const updateUserRoleAndPhoneNumberValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    user_role: Joi.string().optional(),
    phone_number: Joi.string().optional(),
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
  getCities,
  postUserProfileData,
  resetPassValidation,
  createPostTextValidation,
  likePostValidation,
  createCommentTextValidation,
  getCitiesName,
  updateUserRoleAndPhoneNumberValidation
};
