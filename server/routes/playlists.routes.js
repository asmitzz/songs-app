const express = require('express');
const router = express.Router();
const { checkUser,createPlaylist,deletePlaylist,addToPlaylist,removeFromPlaylist } = require('../controllers/playlists.controllers');

router.param("uid",checkUser);

router.route("/playlists/:uid")
.post(createPlaylist);

router.route("/playlists/:uid/:playlistID")
.delete(deletePlaylist);

router.route("/playlists/:uid/:playlistID/:videoID")
.post(addToPlaylist)
.delete(removeFromPlaylist);

module.exports = router;