const express = require('express');

const router = express.Router();

const authController = require('../controllers/auth');
const isAuth = require('../middlewares/isAuth');
const isLoggedOut = require('../middlewares/isLoggedOut');

router.get('/login', isLoggedOut, authController.getLogin);

router.post('/login', authController.postLogin);

router.get('/signup', authController.getSignup);

router.post('/signup', authController.postSignup);

router.get('/:rollNo/logout', isAuth, authController.getLogout);

module.exports = router;