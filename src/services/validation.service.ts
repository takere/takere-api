/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Joi from 'joi';
import Service from './service';


/**
 * Responsible for providing validation services.
 */
class ValidationService extends Service {
  
  // --------------------------------------------------------------------------
  //         Constructor
  // --------------------------------------------------------------------------
  constructor() {
    super();
  }


  // --------------------------------------------------------------------------
  //         Methods
  // --------------------------------------------------------------------------
  public validateRequestCreateUser() {
    return {
      body: Joi.object().keys({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required().custom(this.password),
        role: Joi.string().required().valid('user', 'admin'),
        profileUrl: Joi.string()
      }),
    }
  }

  public validateRequestLogin() {
    return {
      body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required().custom(this.password)
      }),
    }
  }

  public validateRequestGetAgenda() {
    return {
      query: Joi.object().keys({
        email: Joi.string().required().email(),
      }),
    }
  }

  public validateRequestGetBoard() {
    return {
      query: Joi.object().keys({
        email: Joi.string().required().email(),
      }),
    }
  }

  public validateRequestResolveBoard() {
    return {
      body: Joi.object().keys({
        boardId: Joi.string().required().custom(this.objectId),
        answers: Joi.object().required()
      }),
    }
  }

  public validateRequestCreateFlow() {
    return {
      body: Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string().required(),
        patientEmail: Joi.string().required(),
        graph: Joi.array().required(),
      }),
    }
  }

  public validateRequestFlow() {
    return {
      params: Joi.object().keys({
        uid: Joi.string().required().custom(this.objectId),
      }),
    }
  }

  public validateRequestProgress() {
    return {
      query: Joi.object().keys({
        email: Joi.string().required().email(),
      }),
    }
  }

  public validateRequestPatientProgress() {
    return {
      params: Joi.object().keys({
        patientId: Joi.string().custom(this.objectId),
        flowId: Joi.string().custom(this.objectId),
      }),
    }
  }

  public objectId(value: any, helpers: any) {
    if (!value.match(/^[0-9a-fA-F]{24}$/)) {
      return helpers.message('"{{#label}}" must be a valid mongo id');
    }
    
    return value;
  }
  
  public password(value: any, helpers: any) {
    if (value.length < 8) {
      return helpers.message('password must be at least 8 characters');
    }
    if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
      return helpers.message('password must contain at least 1 letter and 1 number');
    }
    return value;
  }
}

export default ValidationService;
