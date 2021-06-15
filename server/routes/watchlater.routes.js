const express = require('express');
const router = express.Router();
const { handleWatchLater } = require('../controllers/watchlater.controllers')

router.route('/watchlater/:uid/:videoID')
.post(handleWatchLater);

module.exports = router;