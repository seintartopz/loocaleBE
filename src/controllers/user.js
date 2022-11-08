const { Op } = require("sequelize");
const { user } = require("../../models");
const fs = require("fs");
const Boom = require("boom");
const validationHelper = require("../helpers/validationHelper");
const { generateOTP } = require("../helpers/otpHelper");
const { sendEmail } = require("../helpers/sendEmailHelper");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.SECRETKEY;

exports.addEmail = async (request, res) => {
  try {
    const { error } = validationHelper.addEmailValidation(request.body);
    if (error) {
      return res.status(400).send(Boom.badRequest(error.details[0].message));
    }
    const OTP = generateOTP();
    const email = request.body.email;
    //check Existing Users
    const checkExistingUser = await user.findOne({
      where: {
        email: { [Op.like]: `%${email}%` },
      },
    });
    if (checkExistingUser) {
      return res.status(400).send(Boom.badRequest("Email Already Exist"));
    }

    sendEmail(email, OTP);

    const createUser = await user.create({
      email,
      OTP,
    });

    res.send({
      status: "success",
      data: {
        users: createUser,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.validateOTP = async (request, res) => {
  try {
    const { error } = validationHelper.OTPValidation(request.body);
    if (error) {
      return res.status(400).send(Boom.badRequest(error.details[0].message));
    }

    const email = request.body.email;
    const OTP = request.body.OTP;
    // validate otp
    const checkExistingUser = await user.findOne({
      where: {
        email: { [Op.like]: `%${email}%` },
      },
    });

    if (checkExistingUser.OTP === OTP) {
      user.update(
        {
          isActive: true,
        },
        {
          where: {
            email: { [Op.like]: `%${email}%` },
            OTP: { [Op.like]: `%${OTP}%` },
          },
        }
      );
    } else {
      return res.status(400).send(Boom.badRequest("OTP IS NOT VALID"));
    }

    res.send({
      status: "success",
      message: "Validate OTP is Success, you good to go",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.signUpForm = async (request, res) => {
  try {
    const { error } = validationHelper.updateUserDataValidation(request.body);
    if (error) {
      return res.status(400).send(Boom.badRequest(error.details[0].message));
    }

    const { email, full_name, user_name, password } = request.body;
    const passwordHashed = await bcrypt.hash(password, 10);
    const checkExistingUser = await user.findOne({
      where: {
        email: { [Op.like]: `%${email}%` },
      },
    });
    if (checkExistingUser === null) {
      return res.status(400).send(Boom.badRequest("User Not Found"));
    } else {
      await user.update(
        {
          full_name,
          user_name,
          password: passwordHashed,
        },
        {
          where: {
            email: { [Op.like]: `%${email}%` },
          },
        }
      );
    }
    const token = jwt.sign(
      { id: checkExistingUser.id, email: checkExistingUser.email },
      secretKey
    );
    res.send({
      statusCode: 200,
      message: "Success",
      data: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.resendOTP = async (request, res) => {
  try {
    const { error } = validationHelper.addEmailValidation(request.body);
    if (error) {
      return res.status(400).send(Boom.badRequest(error.details[0].message));
    }

    const email = request.body.email;
    const OTP = generateOTP();

    // validate user
    const checkExistingUser = await user.findOne({
      where: {
        email: { [Op.like]: `%${email}%` },
      },
    });
    if (checkExistingUser === null) {
      return res.status(400).send(Boom.badRequest("User Not Found"));
    } else if (checkExistingUser.isActive === false) {
      sendEmail(email, OTP);
      await user.update(
        {
          OTP,
        },
        {
          where: {
            email: { [Op.like]: `%${email}%` },
          },
        }
      );
    }

    res.send({
      status: "success",
      message: "Your new OTP Has Sent to Your Email ",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const data = await user.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    res.send({
      status: "success",
      data: {
        users: data,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.getUserDetail = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await user.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (!data) {
      return res.send({
        status: "failed",
        message: "data not found",
      });
    }

    res.status(200).send({
      status: "success",
      data: { users: data },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const users = await user.findOne({
      where: {
        id,
      },
    });

    if (users) {
      await user.destroy({
        where: {
          id,
        },
      });

      return res.status(200).send({
        status: "success",
        message: "delete success",
        data: {
          id,
        },
      });
    }
    res.status(404).send({
      status: "failed",
      message: "no data found",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const finduser = await user.findOne({ where: { id } });

    if (!finduser) {
      return res.send({
        status: "failed",
        message: "data not found",
      });
    }

    if (req.files) {
      var avatar = req.files.avatar[0].filename;
      fs.unlink(`uploads/${finduser.avatar}`, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }

    const datauser = {
      ...req.body,
      avatar,
    };

    await user.update(datauser, {
      where: { id },
    });

    const updateUser = await user.findOne({
      where: { id },
      attributes: { exclude: ["updatedAt", "createdAt"] },
    });

    res.status(200).send({
      status: "Success",
      data: {
        user: {
          fullName: updateUser.fullName,
          email: updateUser.email,
          phone: updateUser.phone,
          avatar: updateUser.avatar,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error ",
    });
  }
};

exports.loginUser = async (request, res) => {
  try {
    const { email, password } = request.body;
    const { error } = validationHelper.loginValidation(request.body);
    if (error) {
      return res.status(400).send(Boom.badRequest(error.details[0].message));
    }

    // validate user
    const checkExistingUser = await user.findOne({
      where: {
        email: { [Op.like]: `%${email}%` },
      },
    });
    if (checkExistingUser === null) {
      return res.status(400).send(Boom.badRequest("No User Found"));
    } else if (checkExistingUser.password === null) {
      return res
        .status(400)
        .send(Boom.badRequest("You haven't validate OTP yet"));
    }

    const isValidPassword = await bcrypt.compare(
      password,
      checkExistingUser.password
    );

    if (!isValidPassword) {
      return res
        .status(400)
        .send(Boom.badRequest("Email and Password don't match"));
    }

    const token = jwt.sign(
      {
        id: isValidPassword.id,
      },
      secretKey
    );

    res.send({
      status: "success",
      data: {
        user: {
          fullName: checkExistingUser.fullName,
          email: checkExistingUser.email,
          token,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};
