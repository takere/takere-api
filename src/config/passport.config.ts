const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

function initialize(passport: any) {
  const UserServiceClass = require("../services/user.service");
  const userService = new UserServiceClass();

  const authenticateUser = async (email: any, password: any, done: any) => {
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
  };

  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
  passport.serializeUser((user: any, done: any) => done(null, user.id));
  passport.deserializeUser((id: any, done: any) => {
    return done(null, userService.findById(id));
  });

  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromHeader("authorization"),
        secretOrKey: process.env.TOKEN_SECRET,
      },
      async function (jwt_payload: any, done: any) {
        try {
          const user = await userService.findById(jwt_payload.data.id);
          return done(null, user);
        } catch (e) {
          return done(e, false);
        }
      }
    )
  );
}


module.exports = initialize;
