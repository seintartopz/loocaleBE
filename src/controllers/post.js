const { Op } = require('sequelize');
const { Post, User, Comments, Media, PostMedia, PostCategories, Connect, Likes, Profiles, sequelize } = require('../../models');
const fs = require('fs');
const Boom = require('boom');
const validationHelper = require('../helpers/validationHelper');
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });
const baseUrlFile = 'https://api.loocale.id/';
const defaultProfilePicture = '1670037246598-istockphoto-522855255-612x612';

exports.postText = async (request, res) => {
  const { error } = validationHelper.createPostTextValidation(request.body);
  if (error) {
    return res.status(400).send(Boom.badRequest(error.details[0].message));
  }
  try {
    const { postText, location, categories, location_detail } = request.body;
    const userId = request.userId
    let tmpArr = []
    let tmpArr2 = []
    let response

    const createProfile = await Post.create({
      userId,
      postText,
      location,
      liked: 0,
      location_detail
    });

    if (request.files.media_files) {
      const postedMedia = await __postMediaToDB(request)
      const idPostedMedia = postedMedia.map(item => (item.id))
      idPostedMedia.reduce(async (result, item) => {
        let tmpData;
        tmpData = { mediaId: item, postId: createProfile.id }
        tmpArr.push(tmpData)
        return Promise.resolve(result);
      }, Promise.resolve([]));
      response = await PostMedia.bulkCreate(tmpArr);
    }


    categories.reduce(async (result, item) => {
      let tmpData;
      tmpData = { connectId: item, postId: createProfile.id }
      tmpArr2.push(tmpData)
      return Promise.resolve(result);
    }, Promise.resolve([]));

    response = await PostCategories.bulkCreate(tmpArr2);




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

exports.getAllPosts = async (request, res) => {
  try {
    const { searchValue } = request.query;
    const userId = request.userId
    let getPosts;
    if (!searchValue) {
      getPosts = await Post.findAll({
        include: [
          {
            model: Connect,
            as: 'Categories',
            attributes: {
              exclude: ['createdAt', 'updatedAt']
            }
          },
          {
            model: User,
            attributes: {
              exclude: ['createdAt', 'updatedAt', 'isActive', 'OTP', 'password']
            }
          },
          {
            model: Comments,
            include: [
              {
                model: User,
                attributes: {
                  exclude: ['createdAt', 'updatedAt', 'isActive', 'OTP', 'password'],
                },
              },
            ],
            order: [["updatedAt", "desc"]],
            attributes: {
              exclude: ['postId', 'updatedAt',]
            }
          },
          {
            model: Media,
            as: 'medias',
            attributes: {
              exclude: ['createdAt', 'updatedAt', 'id']
            }
          },
          {
            model: Likes,
            attributes: {
              exclude: ['createdAt', 'updatedAt']
            }
          },
        ],
        order: [["updatedAt", "desc"]],
      });
      return res.status(200).send({
        statusCode: '200',
        status: 'success input data',
        data: getPosts,
      });
    }
    let connectId;

    getPosts = await Post.findAll({
      where: {
        location: searchValue,
      },
      include: [
        {
          model: Connect,
          as: 'Categories',
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          }
        },
        {
          model: User,
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'isActive', 'OTP', 'password']
          }
        },
        {
          model: Comments,
          include: [
            {
              model: User,
              attributes: {
                exclude: ['createdAt', 'updatedAt', 'isActive', 'OTP', 'password'],
              },
            },
          ],
          order: [["updatedAt", "desc"]],
          attributes: {
            exclude: ['postId', 'updatedAt',]
          }
        },
        {
          model: Media,
          as: 'medias',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'id']
          }
        },
        {
          model: Likes,
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          }
        },
      ],
      order: [["updatedAt", "desc"]],
    });
    if (getPosts.length) {
      return res.status(200).send({
        statusCode: '200',
        status: 'success input data',
        data: getPosts,
      });
    }
    connectId = await Connect.findOne({
      where: {
        title: searchValue
      }
    })
    if (connectId) {
      const getPostCategories = await PostCategories.findAll({
        attributes: ["postId"],
        where: {
          connectId: connectId.id,
        }
      })
      const postIds = getPostCategories.map((category) => String(category.postId))
      getPosts = await Post.findAll({
        where: {
          id: {
            [Op.in]: postIds
          }
        },
        include: [
          {
            model: Connect,
            as: 'Categories',


            attributes: {
              exclude: ['createdAt', 'updatedAt']
            }
          },
          {
            model: User,
            attributes: {
              exclude: ['createdAt', 'updatedAt', 'isActive', 'OTP', 'password']
            }
          },
          {
            model: Comments,
            include: [
              {
                model: User,
                attributes: {
                  exclude: ['createdAt', 'updatedAt', 'isActive', 'OTP', 'password'],
                },
              },
            ],
            order: [["updatedAt", "desc"]],
            attributes: {
              exclude: ['postId', 'updatedAt',]
            }
          },
          {
            model: Media,
            as: 'medias',
            attributes: {
              exclude: ['createdAt', 'updatedAt', 'id']
            }
          },
          {
            model: Likes,
            attributes: {
              exclude: ['createdAt', 'updatedAt']
            }
          },
        ],
        order: [["updatedAt", "desc"]],
      });
      return res.status(200).send({
        statusCode: '200',
        status: 'success input data',
        data: getPosts,
      })
    } else {
      return res.status(200).send({
        statusCode: '200',
        status: 'success input data',
        data: [],
      })

    }
    // getPosts =  getPosts.filter((org => org.tags.some(tag => tag.id == tagId)))


  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'failed',
      message: 'server error',
    });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).send({
        status: "failed",
        message: "No ID in params",
      })
    }

    const post = await Post.findOne({
      where: {
        id
      },
      include: [
        {
          model: Connect,
          as: 'Categories',
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          }
        },
        {
          model: User,
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'isActive', 'OTP', 'password']
          }
        },
        {
          model: Comments,
          include: [
            {
              model: User,
              attributes: {
                exclude: ['createdAt', 'updatedAt', 'isActive', 'OTP', 'password'],
              },
            },
          ],
          order: [["updatedAt", "desc"]],
          attributes: {
            exclude: ['postId', 'updatedAt',]
          }
        },
        {
          model: Media,
          as: 'medias',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'id']
          }
        },
        {
          model: Likes,
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          }
        },
      ],
    })

    if (!post) {
      res.status(404).send({
        status: "failed",
        message: "Post not found"
      })
    }
    res.status(200).send({
      status: "200",
      message: "Success get post by ID",
      data: post
    })
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: 'failed',
      message: 'server error',
    });
  }
}

exports.likePost = async (request, res) => {
  try {
    const { error } = validationHelper.likePostValidation(request.body);
    if (error) {
      return res.status(400).send(Boom.badRequest(error.details[0].message));
    }
    const { postId } = request.body;
    const userId = request.userId

    const checkUserAlreadyLikes = await Likes.findOne({
      where: {
        likedById: userId,
        postId: postId
      },
    });
    let response
    if (checkUserAlreadyLikes) {
      await Likes.destroy({
        where: {
          likedById: userId,
          postId: postId
        },
      });
      res.status(200).send({
        statusCode: '200',
        status: 'success Unliked',
      });
    } else {
      await Likes.create({
        likedById: userId,
        postId: postId
      });
      res.status(200).send({
        statusCode: '200',
        status: 'success liked',
      });
    }

  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'failed',
      message: 'server error',
    });
  }
};

const __postMediaToDB = async (request) => {
  try {
    const media = request.files.media_files;
    const arr = media.map((item) => {
      return { media_url: baseUrlFile + "post-media/" + item.filename }
    });
    // add to db
    const inputData = await Media.bulkCreate(arr,
      {
        fields: ["media_url"]
      });
    return inputData
  } catch (error) {
    console.log(error)
  }
};


exports.deletePosts = async (req, res) => {
  const { id } = req.params;

  try {
    const checkPosts = await Post.findOne({
      where: {
        id,
      },
    });
    const checkMedia = await PostMedia.findOne({
      where: {
        postId: id,
      },
    });
    if (checkMedia) {
      const getMediaFileName = await Media.findOne({
        where: {
          id: checkMedia.mediaId,
        },
      });
      const mediaFileName = getMediaFileName.media_url.slice(34);
      console.log(mediaFileName)
      fs.unlink(`uploads/post-media/${mediaFileName}`, function (err) {
        if (err) throw err;
        // if no error, file has been deleted successfully
        console.log(`File ${mediaFileName} has been deleted!`);
      })
    }

    if (checkPosts) {
      PostCategories.destroy({
        where: {
          postId: id,
        },
      });
      PostMedia.destroy({
        where: {
          postId: id,
        },
      });
      Post.destroy({
        where: {
          id,
        },
      });

      return res.status(200).send({
        status: 'success',
        message: 'delete success',
        data: {
          id,
        },
      });
    } else res.status(404).send({
      status: 'failed',
      message: 'no data found',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'failed',
      message: 'server error',
    });
  }
};


exports.notifPosts = async (req, res) => {
  const userId = req.userId;

  try {
    const checkPosts = await Post.findAll({
      where: {
        userId: userId,
      },
      include: [
        {
          model: Comments,
          include: [
            {
              model: User,
              attributes: {
                exclude: ['createdAt', 'updatedAt', 'isActive', 'OTP', 'password'],
              },
            },
          ],
          order: [["updatedAt", "desc"]],
          attributes: {
            exclude: ['postId', 'updatedAt',]
          }
        },
        {
          model: Likes,
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          }
        },
      ],
    });

    const notifResponse = checkPosts.map((item) => {
      const response = {
        idPost: item.id,
        postText: item.postText.split(" ").slice(0, 4).join(" "),
        likesCount: item.Likes.length,
        commentCount: item.Comments.length
      }
      return response
    });



    return res.status(200).send({
      status: 'success',
      data: notifResponse
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'failed',
      message: 'server error',
    });
  }
};

const sum = async (arr) => {
  const sumValues = arr.reduce((partialSum, arr) => partialSum + arr, 0)
  console.log(sumValues)
  return sumValues
};
