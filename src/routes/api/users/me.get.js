const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res, next) {
  let user = await req.user;
  res.send({status: 200, message: 'ok', data: {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      profileUrl: user.profileUrl,
      createdAt: user.createdAt,
    }})
});

module.exports = router;
