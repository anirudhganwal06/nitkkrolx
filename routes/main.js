const express = require('express');

const router = express.Router();

const mainController = require('../controllers/main');
const isLoggedOut = require('../middlewares/isLoggedOut');

router.get('/', isLoggedOut, mainController.getHomePage);

module.exports = router;