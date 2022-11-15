const express = require("express");

const router = express.Router();

const { auth } = require("../middlewares/auth");
const { uploadFile } = require("../middlewares/uploadFile");

const { createDiscover, getAllDiscover } = require("../controllers/discover");
const {
  createConnectData,
  getAllConnectData,
} = require("../controllers/connect");

const {
  getUser,
  addEmail,
  validateOTP,
  signUpForm,
  resendOTP,
  loginUser,
  signUpGoogle,
  validateUsername,
} = require("../controllers/user");

// discover api
router.post("/discover", uploadFile("discoverImage"), createDiscover);
router.get("/discover", auth, getAllDiscover);

// connect api
router.post("/connect", uploadFile("background"), createConnectData);
router.get("/connect", getAllConnectData);

//users api
router.get("/users", getUser);
router.post("/user/email", addEmail);
router.post("/user/validate/otp", validateOTP);
router.post("/user/signup/form", signUpForm);
router.post("/user/resend/otp", resendOTP);
router.post("/login", loginUser);
router.post("/user/signup/google", signUpGoogle);
router.post("/user/validate/username", validateUsername);

module.exports = router;
