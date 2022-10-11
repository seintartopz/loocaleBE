// const { user } = require("../../models");
// const joi = require("joi");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// exports.regitrasi = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const data = req.body;

//     const schema = joi.object({
//       email: joi.string().email().min(6).required(),
//       password: joi.string().required(),
//       fullName: joi.string().min(3).required(),
//     });

//     const { error } = schema.validate(req.body);

//     if (error) {
//       return res.send({
//         status: "Validation Failed",
//         message: error.details[0].message,
//       });
//     }

//     const registeredUser = await user.findOne({
//       where: {
//         email,
//       },
//     });

//     if (registeredUser) {
//       return res.send({
//         status: "Failed",
//         message: "Email Already Registered",
//       });
//     }

//     const hashStrenght = 10;
//     const hashedPassword = await bcrypt.hash(password, hashStrenght);

//     const dataUser = await user.create({
//       ...data,
//       password: hashedPassword,
//     });

//     const secretKey = "myCustomPassword";
//     const token = jwt.sign(
//       {
//         id: dataUser.id,
//       },
//       secretKey
//     );

//     res.send({
//       status: "Success",
//       data: {
//         user: {
//           email: dataUser.email,
//           fullName: dataUser.fullName,
//           token,
//         },
//       },
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       status: "failed",
//       message: "server error",
//     });
//   }
// };

// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const schema = joi.object({
//       email: joi.string().email().required(),
//       password: joi.string().required(),
//     });

//     const { error } = schema.validate(req.body);

//     if (error) {
//       return res.send({
//         status: "Validation Failed",
//         message: error.details[0].message,
//       });
//     }

//     const registeredUser = await user.findOne({
//       where: {
//         email,
//       },
//     });

//     if (!registeredUser) {
//       return res.send({
//         status: "Login Failed",
//         message: "Email and Password don't match",
//       });
//     }

//     const isValidPassword = await bcrypt.compare(
//       password,
//       registeredUser.password
//     );

//     if (!isValidPassword) {
//       return res.send({
//         status: "Login Failed",
//         message: "Email and Password don't match",
//       });
//     }

//     const secretKey = "myCustomPassword";

//     const token = jwt.sign(
//       {
//         id: registeredUser.id,
//       },
//       secretKey
//     );

//     res.send({
//       status: "success",
//       data: {
//         user: {
//           id: registeredUser.id,
//           fullName: registeredUser.fullName,
//           email: registeredUser.email,
//           token,
//         },
//       },
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       status: "failed",
//       message: "server error",
//     });
//   }
// };
