const express = require('express');
const router = express.Router();
const cors = require('cors');
const passport = require('passport');

router.use('/create', passport.authenticate('jwt'), require('./create.post'));
router.use('/mines', passport.authenticate('jwt'), require('./mines.get'));
router.use('/mine', passport.authenticate('jwt'), require('./mine.get'));
router.options('*', cors())

module.exports = router;
