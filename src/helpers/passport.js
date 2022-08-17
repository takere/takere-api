const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const UserService = require('../services/user.service');
const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

function initialize(passport) {

  const authenticateUser = async (email, password, done) => {
    const user = await UserService.findByEmail(email)
    if (user === null) {
      return done(null, false, { message: 'Usuário ou senha inválido' })
    }
    try {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        return done(null, user)
      } else {
        return done(null, false, { message: 'Usuário ou senha inválido' })
      }
    } catch (e) {
      return done(e)
    }
  }

  passport.use(new LocalStrategy({usernameField: 'email'}, authenticateUser))
  passport.serializeUser((user, done) => done(null, user._id))
  passport.deserializeUser((id, done) => {
    return done(null, UserService.findById(id))
  })

  passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: process.env.TOKEN_SECRET
  }, async function(jwt_payload, done) {
    try{
      const user = await UserService.findById(jwt_payload.data._id)
      return done(null, user);
    } catch (e){
      return done(e, false);
    }
  }));

}

module.exports = initialize
