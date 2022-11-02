require('dotenv').config();

const general = {
  port: process.env.PORT,
  environment: process.env.ENVIRONMENT,
  bcrypt_salt: process.env.BCRYPT_SALT,
  token_secret: process.env.TOKEN_SECRET,
};

export default general;
