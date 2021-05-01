const express = require('express');
const router = express.Router();

const { getAllVideos,getVideosByCategory } = require('../controllers/videos.controllers')

router.get("/allvideos",getAllVideos);
router.get("/videosbycategory",getVideosByCategory);

module.exports = router;