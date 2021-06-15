const express = require('express');
const router = express.Router();

const { signup,login,checkUser,getUser } = require('../controllers/users.controllers.js')

router.param("uid",checkUser)
router.post('/users/signup',signup);
router.post('/users/login',login);
router.get('/users/:uid',getUser);

module.exports = router;