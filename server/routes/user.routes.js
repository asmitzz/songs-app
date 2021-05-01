const express = require('express');
const router = express.Router();

const { signup,login,checkUser,getUser,handleWatchLater,addToHistory,removeFromHistory } = require('../controllers/users.controllers.js')

router.param("uid",checkUser)
router.post('/users/signup',signup);
router.post('/users/login',login);
router.get('/users/:uid',getUser);

router.route('/users/history/:uid')
.post(addToHistory);

router.route('/users/history/:uid/:videoID')
.delete(removeFromHistory);

router.route('/users/watchlater/:uid')
.post(handleWatchLater);

module.exports = router;