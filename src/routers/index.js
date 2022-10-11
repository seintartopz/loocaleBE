const express = require("express");

const router = express.Router();

const { auth } = require("../middlewares/auth");
const { uploadFile } = require("../middlewares/uploadFile");

const { createDiscover, getAllDiscover } = require("../controllers/discover");
const { createConnectData, getAllConnectData } = require("../controllers/connect");


router.post("/discover", uploadFile("discoverImage"), createDiscover);
router.get("/discover", getAllDiscover);
router.post("/connect", uploadFile("background"), createConnectData);
router.get("/connect", getAllConnectData);


module.exports = router;
