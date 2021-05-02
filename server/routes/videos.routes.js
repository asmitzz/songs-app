const express = require('express');
const router = express.Router();

const { checkVideo,getAllVideos,getVideosByCategory,updateLike,updateDislike,updateViews } = require('../controllers/videos.controllers');

router.param("videoID",checkVideo);
router.get("/allvideos",getAllVideos);
router.get("/videosbycategory",getVideosByCategory);
router.post("/videos/like/:uid/:videoID",updateLike);
router.post("/videos/dislike/:uid/:videoID",updateDislike);
router.post("/videos/views/:uid/:videoID",updateViews);

module.exports = router;