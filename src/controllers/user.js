const { user } = require("../../models");
const fs = require("fs");

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
