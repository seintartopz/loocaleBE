const otpGenerator = require("otp-generator");

const generateOTP = () => {
  const OTP = Math.floor(100000 + Math.random() * 900000)
  return OTP;
};


// The OTP_LENGTH is a number, For my app i selected 10.
// The OTP_CONFIG is an object that looks like
OTP_CONFIG = {
  digits: true,
};

module.exports = {
  generateOTP,
};
