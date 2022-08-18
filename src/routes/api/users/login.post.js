const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

/* GET users listing. */
router.post('/', async function(req, res, next) {

  const user = await req.user
  const userData = {
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    profileUrl: user.profileUrl,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt

  }
  const token = jwt.sign({
    data: userData
  }, process.env.TOKEN_SECRET, {
    expiresIn: '2y'
  });

  res.send({
    status: 200,
    message: 'Login feito com sucesso!',
    token
  });
});

module.exports = router;
