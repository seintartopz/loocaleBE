const { Op } = require('sequelize');
const { Profiles, ProfileCommunities, User } = require('../../models');
const fs = require('fs');
const Boom = require('boom');
const validationHelper = require('../helpers/validationHelper');
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env")});
const baseUrlFile = 'https://api.loocale.id/';
const defaultProfilePicture = '1670037246598-istockphoto-522855255-612x612';

exports.postUserProfileData = async (request, res) => {
  try {
    const { error } = validationHelper.postUserProfileData(request.body);
    if (error) {
      return res.status(400).send(Boom.badRequest(error.details[0].message));
    }
    let tmpArr2 = []
    let image;
    if (request.files.profileImage == null) {
      image = "";
    } else {
      image = request.files.profileImage[0].filename;
    }

    const { province, city, connectId } = request.body;
    const userId = request.userId

    const createProfile = await Profiles.create({
      userId,
      avatar: image ? baseUrlFile + "user-profile-picture/" + image : "",
      province,
      city,
    });

    await User.update(
      {
        thumbnail: image ? baseUrlFile + "user-profile-picture/" + image : "",
      },
      {
        where: {
          id: userId,
        },
      }
    );

    connectId.reduce(async (result, item) => {
      let tmpData;
      tmpData = { connectId: item, profileId: createProfile.id }
      tmpArr2.push(tmpData)
      return Promise.resolve(result);
    }, Promise.resolve([]));


    await ProfileCommunities.bulkCreate(tmpArr2);
    const response = await User.update(
      {
        isFirstSignIn: false,
      },
      {
        where: {
          id: userId,
        },
      }
    );
    res.status(200).send({
      statusCode: '200',
      status: 'success input data',
      data: response,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'failed',
      message: 'server error',
    });
  }
};
