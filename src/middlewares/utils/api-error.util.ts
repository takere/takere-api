/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

class ApiError extends Error {

  // --------------------------------------------------------------------------
  //         Attributes
  // --------------------------------------------------------------------------
  statusCode: any;
  isOperational: boolean;


  // --------------------------------------------------------------------------
  //         Constructor
  // --------------------------------------------------------------------------
  constructor(statusCode: any, message: string | undefined, isOperational = true, stack = '') {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    if (stack) {
      this.stack = stack;
    } 
    else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
