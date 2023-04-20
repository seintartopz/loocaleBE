const { Connect, PostCategories } = require('../../models');
const sequelize = require("sequelize");

exports.createConnectData = async (req, res) => {
  try {
    const background = req.files.background[0].filename;

    const addData = await Connect.create({
      ...req.body,
      background: 'https://api.loocale.id/' + background,
    });

    res.status(200).send({
      statusCode: '200',
      status: 'success',
      data: addData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'failed',
      message: 'server error',
    });
  }
};

exports.getAllConnectData = async (req, res) => {
  try {
    const getAllData = await Connect.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
				include: [[sequelize.literal('(SELECT COUNT(*) FROM PostCategories WHERE PostCategories.connectId = Connect.id)'), 'count']]
      },
			order: [[sequelize.literal('count'), 'DESC']]
    });

    res.status(200).send({
      statusCode: '200',
      status: 'success',
      data: getAllData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'failed',
      message: 'server error',
      error: error
    });
  }
};
