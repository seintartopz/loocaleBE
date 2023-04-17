const { Op } = require('sequelize');
const { Post, User, Comments } = require('../../models');
const fs = require('fs');
const Boom = require('boom');
const path = require("path");
const validationHelper = require('../helpers/validationHelper');
require("dotenv").config({ path: path.resolve(__dirname, "../../.env")});
const baseUrlFile = 'https://api.loocale.id/';
const defaultProfilePicture = '1670037246598-istockphoto-522855255-612x612';

exports.postComment = async (request, res) => {
  try {
    const { error } = validationHelper.createCommentTextValidation(request.body);
    if (error) {
      return res.status(400).send(Boom.badRequest(error.details[0].message));
    }

    const { commentText, postId } = request.body;
    const userId = request.userId

    const createProfile = await Comments.create({
      idUserComment: userId,
      postId,
      commentText,
    });

    res.status(200).send({
      statusCode: '200',
      status: 'success input data',
      data: createProfile,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'failed',
      message: 'server error',
    });
  }
};
