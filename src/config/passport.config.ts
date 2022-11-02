import LocaleService from '../services/locale.service';
import UserService from '../services/user.service';
import passportLocal from 'passport-local';
import bcrypt from "bcrypt";
import passportJWT from "passport-jwt";

const LocalStrategy = passportLocal.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: process.env.TOKEN_SECRET,
}

const jwtVerify = async function (jwt_payload: any, done: any) {
  const userService = new UserService();

  try {
    const user = await userService.findById(jwt_payload.data.id);
    
    return done(null, user);
  } 
  catch (e) {
    return done(e, false);
  }
}

export const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

const localOptions = {
  usernameField: "email"
}

const localVerify = async (email: any, password: any, done: any) => {
  const userService = new UserService();
  const user = await userService.findByEmail(email);
  const localeService = new LocaleService();
  
  if (user === null) {
    return done(null, false, { message: localeService.translate("INVALID_USER_PASSWORD") });
  }
  try {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      return done(null, user);
    } else {
      return done(null, false, { message: localeService.translate("INVALID_USER_PASSWORD") });
    }
  } catch (e) {
    return done(e);
  }
}

export const localStrategy = new LocalStrategy(localOptions, localVerify);
