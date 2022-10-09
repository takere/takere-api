const userCreationErrorHandler = (err: any, req: any, res: any, next: any) => {
  if (err.name === 'MongoError' && err.code === 11000) {
    
    if("email" in err.keyValue){
      res.status(400).send({ msg: `Email ${err.keyValue.email} already exist!`, status: 401, field: 'email' });
    }
  } 
  else {
    res.status(400).send({msg: err.message || 'Unable To Create User', status: 400})
  }
}

export = userCreationErrorHandler;
