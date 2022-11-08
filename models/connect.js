"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class connect extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  connect.init(
    {
      background: DataTypes.STRING,
      title: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "connect",
    }
  );
  return connect;
};
