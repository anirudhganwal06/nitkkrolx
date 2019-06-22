const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');
const isAuth = require('../middlewares/isAuth');

router.get('/:rollNo', isAuth, userController.getUserHomePage);

router.get('/:rollNo/personal-info', isAuth, userController.getUserPersonalInfo);

router.get('/:rollNo/update-personal-info', isAuth, userController.getUpdateUserPersonalInfo);

router.post('/:rollNo/update-personal-info', isAuth, userController.postUpdateUserPersonalInfo);

router.get('/:rollNo/change-password', isAuth, userController.getChangePassword);

router.post('/:rollNo/change-password', isAuth, userController.postChangePassword);

module.exports = router;