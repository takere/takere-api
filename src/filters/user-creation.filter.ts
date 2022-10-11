import LocaleService = require('../services/locale.service');

const userCreationErrorHandler = (err: any, req: any, res: any, next: any) => {
  const localeService = new LocaleService();

  if (err.name === 'MongoError' && err.code === 11000) {
    if("email" in err.keyValue){
      res.status(400).send({ msg: localeService.translate("EMAIL_ALREADY_EXISTS", err.keyValue.email), status: 401, field: 'email' });
    }
  } 
  else {
    res.status(400).send({msg: err.message || localeService.translate("UNABLE_CREATE_USER"), status: 400})
  }
}

export = userCreationErrorHandler;
