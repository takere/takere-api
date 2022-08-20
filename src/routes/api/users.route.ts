const express = require('express');
const router = express.Router();
const passport = require('passport');
const cors = require('cors');
const userController = require('../../controllers/user.controller');

router.post('/create', userController.createUser);
router.post('/login', passport.authenticate('local'), userController.login);
router.get('/me', passport.authenticate('jwt') , userController.getUser);
router.get('/logout', userController.logout);

router.options('*', cors())

module.exports = router;
