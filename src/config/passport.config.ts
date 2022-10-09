const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: process.env.TOKEN_SECRET,
}

const jwtVerify = async function (jwt_payload: any, done: any) {
  const UserServiceClass = require("../services/user.service");
  const userService = new UserServiceClass();

  try {
    const user = await userService.findById(jwt_payload.data.id);
    
    return done(null, user);
  } 
  catch (e) {
    return done(e, false);
  }
}

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

const localOptions = {
  usernameField: "email"
}

const localVerify = async (email: any, password: any, done: any) => {
  const UserServiceClass = require("../services/user.service");
  const userService = new UserServiceClass();
  const user = await userService.findByEmail(email);
  
  if (user === null) {
    return done(null, false, { message: "Usuário ou senha inválido" });
  }
  try {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      return done(null, user);
    } else {
      return done(null, false, { message: "Usuário ou senha inválido" });
    }
  } catch (e) {
    return done(e);
  }
}

const localStrategy = new LocalStrategy(localOptions, localVerify);

module.exports = {
  jwtStrategy,
  localStrategy
};