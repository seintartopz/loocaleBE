const express = require('express');

const router = express.Router();

const { auth } = require('../middlewares/auth.js');
const { uploadFile } = require('../middlewares/UploadFile.js');
const { uploadUserPicture } = require('../middlewares/uploadUserPicture.js');
const { uploadPostsMedia } = require('../middlewares/uploadPostMedia.js');

const { createDiscover, getAllDiscover, getDiscoverPageOptions } = require('../controllers/discover');
const { createConnectData, getAllConnectData } = require('../controllers/connect');

const {
  getUser,
  addEmail,
  validateOTP,
  signUpForm,
  resendOTP,
  loginUser,
  signUpGoogle,
  validateUsername,
  loginViaGoogle,
  forgotPassword,
  resetPassword,
  getUserDetail
} = require('../controllers/user');

const { getProvinces, getCities, getCitiesName } = require('../controllers/area');

const { postUserProfileData } = require('../controllers/profile');

const { postText, getAllPosts, likePost, getPostById, deletePosts, notifPosts } = require('../controllers/post');
const { postComment } = require('../controllers/comment');

// discover api
router.post('/discover', uploadFile('discoverImage'), createDiscover);
router.get('/discover', getAllDiscover);

// connect api
router.post('/connect', uploadFile('background'), createConnectData);
router.get('/connect', getAllConnectData);

//users api
router.get('/users', auth, getUser);
router.get('/user', auth, getUserDetail);
router.post('/user/email', addEmail);
router.post('/user/validate/otp', validateOTP);
router.post('/user/signup/form', signUpForm);
router.post('/user/resend/otp', resendOTP);
router.post('/login', loginUser);
router.post('/user/signup/google', signUpGoogle);
router.post('/user/login/google', loginViaGoogle);
router.post('/user/validate/username', validateUsername);
router.post('/user/forgot-password', forgotPassword);
router.post('/user/reset-password', resetPassword);

//area api
router.get('/provinces', getProvinces);
router.get('/cities', getCities);
router.get('/cities-name', getCitiesName);

// Discover Page Api
router.get("/discover-page/options", getDiscoverPageOptions)

// Profiles API
router.post('/userprofiles', uploadUserPicture('profileImage'), auth, postUserProfileData);

// Create Post API
router.post('/create-post', auth, uploadPostsMedia('media_files'), postText);
router.post('/like-post', auth, likePost);
router.get('/posts', getAllPosts);
router.get('/posts/:id', getPostById);
router.delete('/post/:id', deletePosts);
router.get('/notif-posts', auth, notifPosts);

// Comment API
router.post('/comment', auth, postComment);

module.exports = router;
