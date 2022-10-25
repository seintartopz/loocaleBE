const {discover}  = require("../../models");

exports.createDiscover = async (req, res) => {
    try {
      const image = req.files.discoverImage[0].filename;
  
      const datafilm = await discover.create({
        ...req.body,
        image: 'http://localhost:5000/' + image,
      });
  
      res.status(200).send({
        statusCode: "200",
        status: "success",
        data: { datafilm },
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        status: "failed",
        message: "server error",
      });
    }
  };
  
exports.getAllDiscover = async (req, res) => {
try {
    const getAllData = await discover.findAll({

        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });

    res.status(200).send({
    statusCode: "200",
    status: "success",
    data: getAllData ,
    });
} catch (error) {
    console.log(error);
    res.status(500).send({
    status: "failed",
    message: "server error",
    });
}
};