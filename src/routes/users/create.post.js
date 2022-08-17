const express = require('express');
const router = express.Router();
const UserService = require('../../services/user.service');

const logger = require('./../../helpers/logger');
const jwt = require('jsonwebtoken');

router.post('/', async function(req, res, next) {
  try {
    const {firstName, lastName, password, email} = req.body

    if(!validateEmail(email)) throw new Error('Invalid Email')
    if(password.length < 3) throw new Error('Password is too small')
    const profileUrl = `https://api.adorable.io/avatars/285/${email}`

    const createdUser = await UserService.createUser(firstName, lastName, password, email, profileUrl)
    const token = jwt.sign({
      data: createdUser
    }, process.env.TOKEN_SECRET, {
      expiresIn: '2y'
    });
    res.send({...createdUser, token})
  } catch (e) {
    if (e.name === 'MongoError' && e.code === 11000) {
      logger.error('Mongoose Error', e)
      if("email" in e.keyValue){
        res.status(400).send({ msg: `Email ${e.keyValue.email} already exist!`, status: 401, field: 'email' });
      }
    } else {
      logger.error('Unable to Create User', e)
      res.status(400).send({msg: e.message || 'Unable To Create User', status: 400})
    }
  }
});

module.exports = router;

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
