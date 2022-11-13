/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import passport from 'passport';
import cors from 'cors';
import Route from '../route';
import NodeController from '../../controllers/node.controller';


class NodesRoute extends Route {

  // --------------------------------------------------------------------------
  //         Attributes
  // --------------------------------------------------------------------------
  private readonly nodeController: NodeController;


  // --------------------------------------------------------------------------
  //         Constructor
  // --------------------------------------------------------------------------
  constructor() {
    super();
    this.nodeController = new NodeController();
  }


  // --------------------------------------------------------------------------
  //         Methods
  // --------------------------------------------------------------------------
  protected buildRoutes(router: any) {
    router.get(
      '/me', 
      passport.authenticate('jwt'), 
      this.nodeController.get
    );
    router.get(
      '/connections', 
      passport.authenticate('jwt'), 
      this.nodeController.getAllConnections
    );
    router.options('*', cors());
  }
}

export default NodesRoute;
