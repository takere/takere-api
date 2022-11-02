const logoutErrorHandler = (err: any, req: any, res: any, next: any) => {
  if (!err) {
    res.status(200).clearCookie('connect.sid', {path: '/'}).json({status: "Success"});
  } 
  else {
    console.log(res)
  }
}

export default logoutErrorHandler;
