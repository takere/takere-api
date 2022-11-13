/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import dotenv from 'dotenv';


dotenv.config();

const general = {
  port: process.env.PORT,
  environment: process.env.ENVIRONMENT,
  bcrypt_salt: process.env.BCRYPT_SALT,
  token_secret: process.env.TOKEN_SECRET
};

export default general;
