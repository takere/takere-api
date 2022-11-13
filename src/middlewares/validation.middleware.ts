/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Joi from 'joi';
import httpStatus from 'http-status';
import ApiError from './utils/api-error.util';


// TODO: refactor
const validate = (schema: any) => (req: any, res: any, next: any) => {

  const validSchema = pick(schema, ['params', 'query', 'body']);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(object);

  if (error) {
    const errorMessage = error.details.map(
      (details: { message: any; }) => details.message
    );
    
    return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage.join(', ')));
  }

  Object.assign(req, value);
  
  return next();
};

const pick = (object: any, keys: any) => {
  return keys.reduce((obj: any, key: any) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      obj[key] = object[key];
    }
    return obj;
  }, {});
};

export default validate;
