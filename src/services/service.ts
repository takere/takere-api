/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Repositories from '../repositories';


/**
 * Responsible for handle business logic along with repositories.
 */
abstract class Service {

  // --------------------------------------------------------------------------
  //         Attributes
  // --------------------------------------------------------------------------
  protected readonly repository;


  // --------------------------------------------------------------------------
  //         Constructor
  // --------------------------------------------------------------------------
  constructor() {
    this.repository = new Repositories();
  }
}

export default Service;
