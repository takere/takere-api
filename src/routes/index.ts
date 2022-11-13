/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import RouteList from "../models/route-list.model";
import apiRoutes from './api';


/**
 * Responsible for providing application routes.
 */
class Routes {
  
  // --------------------------------------------------------------------------
  //         Attributes
  // --------------------------------------------------------------------------
  private readonly _routeList: RouteList[];


  // --------------------------------------------------------------------------
  //         Constructor
  // --------------------------------------------------------------------------
  constructor() {
    this._routeList = apiRoutes;
  }
  

  // --------------------------------------------------------------------------
  //         Getters
  // --------------------------------------------------------------------------
  get routeList(): RouteList[] {
    return this._routeList;
  }
}

export default Routes;
