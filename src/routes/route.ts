/*
* Copyright (c) William Niemiec.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

import express from 'express';
import ValidationService from '../services/validation.service';


/**
 * Responsible for managing a route.
 */
abstract class Route {

  // --------------------------------------------------------------------------
  //         Attributes
  // --------------------------------------------------------------------------
  protected readonly validationService: ValidationService;

  
  // --------------------------------------------------------------------------
  //         Constructor
  // --------------------------------------------------------------------------
  constructor() {
    this.validationService = new ValidationService();
  }


  // --------------------------------------------------------------------------
  //         Methods
  // --------------------------------------------------------------------------
  public build() {
    const router = express.Router();

    this.buildRoutes(router);

    return router;
  }

  protected abstract buildRoutes(router: any): void;
}

export default Route;
