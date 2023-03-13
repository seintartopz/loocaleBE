const { discover } = require("../../models");
const areaConfig = require('../../assets/area.json');
const { Connect } = require('../../models');


exports.createDiscover = async (req, res) => {
  try {
    const image = req.files.discoverImage[0].filename;

    const datafilm = await discover.create({
      ...req.body,
      image: "http://194.59.165.97:5000" + image,
    });

    res.status(200).send({
      statusCode: "200",
      status: "success",
      data: { datafilm },
    });
  } catch (error) {
    console.log();
    res.status(500).send({
      statusCode: 500,
      error: "Internal Server Error",
      message: "An internal server error occurred",
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
      data: getAllData,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      status: "Failed",
      message: "Internal Server Error",
    });
  }
};

exports.getDiscoverPageOptions = async (req, res) => {
  try {
    const searchParams = req.query.searchValue;
    const getCities = areaConfig.cities;
    const getConnect = await Connect.findAll()
    const citiesAndConnect = getCities.map((city) => city.name).concat(getConnect.map((connectValue) => connectValue.title))

    let data = [];
    citiesAndConnect.filter((item) => {
      if (item.toLowerCase().indexOf(searchParams.toLowerCase()) === 0) {
        data.push(item);
      }
      return data.sort();
    });
    return res.send({
      statusCode: '200',
      status: 'success',
      data,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      status: "Failed",
      message: "Internal Server Error",
    });
  }
}