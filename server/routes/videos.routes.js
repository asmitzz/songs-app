const express = require('express');
const router = express.Router();

const { checkVideo,getVideo,getAllVideos,getVideosByCategory,updateLike,updateDislike,updateViews } = require('../controllers/videos.controllers');

router.param("videoID",checkVideo);
router.get("/videos/:videoID",getVideo);
router.get("/videos",getAllVideos);
router.get("/videosbycategory",getVideosByCategory);
router.post("/videos/like/:uid/:videoID",updateLike);
router.post("/videos/dislike/:uid/:videoID",updateDislike);
router.post("/videos/views/:uid/:videoID",updateViews);

module.exports = router;