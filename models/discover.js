'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class discover extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  discover.init({
    image: DataTypes.STRING,
    location: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'discover',
  });
  return discover;
};