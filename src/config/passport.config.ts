/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import LocaleService from '../services/locale.service';
import UserService from '../services/user.service';
import bcrypt from "bcrypt";
import passportLocal from 'passport-local';
import passportJWT from "passport-jwt";


// ----------------------------------------------------------------------------
//         Constants
// ----------------------------------------------------------------------------
export const jwtStrategy = buildJwtStrategy();
export const localStrategy = buildLocalStrategy();


// ----------------------------------------------------------------------------
//         Functions
// ----------------------------------------------------------------------------
function buildJwtStrategy() {
  const jwtOptions = {
    jwtFromRequest: passportJWT.ExtractJwt.fromHeader("authorization"),
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
  
  return new passportJWT.Strategy(jwtOptions, jwtVerify);
}

function buildLocalStrategy() {
  const localOptions = {
    usernameField: "email"
  }
  
  const localVerify = async (email: any, password: any, done: any) => {
    const localeService = new LocaleService();
    const userService = new UserService();
    const user = await userService.findByEmail(email);
    
    if (user === null) {
      return done(null, false, { message: localeService.translate("INVALID_USER_PASSWORD") });
    }

    try {
      const match = await bcrypt.compare(password, user.password);
      
      if (match) {
        return done(null, user);
      } 
      else {
        return done(null, false, { message: localeService.translate("INVALID_USER_PASSWORD") });
      }
    } 
    catch (e) {
      return done(e);
    }
  }
  
  return new passportLocal.Strategy(localOptions, localVerify);
}
