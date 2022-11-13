/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import LocaleService from '../services/locale.service';


const userCreationErrorHandler = (err: any, req: any, res: any, next: any) => {

  const localeService = new LocaleService();

  if (err.name === 'MongoError' && err.code === 11000) {
    if("email" in err.keyValue){
      res.status(400).send({ 
        msg: localeService.translate("EMAIL_ALREADY_EXISTS", err.keyValue.email), 
        status: 401, 
        field: 'email' 
      });
    }
  } 
  else {
    res.status(400).send({
      msg: err.message || localeService.translate("UNABLE_CREATE_USER"), 
      status: 400
    })
  }
}

export default userCreationErrorHandler;
