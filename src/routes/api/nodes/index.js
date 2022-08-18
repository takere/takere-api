const express = require('express');
const router = express.Router();
const passport = require('passport');
const cors = require('cors');

router.use('/me' , passport.authenticate('jwt') , require('./me.get'));
router.options('*', cors())


module.exports = router;
