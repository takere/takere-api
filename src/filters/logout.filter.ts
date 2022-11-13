/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const logoutErrorHandler = (err: any, req: any, res: any, next: any) => {
  if (!err) {
    res.status(200).clearCookie('connect.sid', {path: '/'}).json({status: "Success"});
  } 
  else {
    console.log(res)
  }
}

export default logoutErrorHandler;
