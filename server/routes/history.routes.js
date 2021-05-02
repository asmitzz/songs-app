const express = require('express');
const router = express.Router();

const { addToHistory,removeFromHistory } = require('../controllers/history.controllers')

router.route('/history/:uid/:videoID')
.post(addToHistory);

router.route('/history/:uid/:videoID')
.delete(removeFromHistory);

module.exports = router;