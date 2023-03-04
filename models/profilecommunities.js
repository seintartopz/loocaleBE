'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProfileCommunities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ProfileCommunities.init({
    profileId: DataTypes.INTEGER,
    connectId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProfileCommunities',
  });
  return ProfileCommunities;
};