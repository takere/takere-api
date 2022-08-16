const express = require('express');
const router = express.Router();
const passport = require('passport');
const cors = require('cors');
const auth = require('./../../helpers/auth')

router.use('/create', require('./create.post'));
router.use('/login', passport.authenticate('local') , require('./login.post'));
router.use('/me' , passport.authenticate('jwt') , require('./me.get'));
router.get('/logout', function(req, res) {
  req.logout();
  req.session.destroy(function (err) {
    if (!err) {
      res.status(200).clearCookie('connect.sid', {path: '/'}).json({status: "Success"});
    } else {
      // handle error case...
      console.log(res)
    }

  });
});
router.options('*', cors())


module.exports = router;
