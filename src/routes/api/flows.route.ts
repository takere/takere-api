/*
* Copyright (c) William Niemiec.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

import passport from 'passport';
import cors from 'cors';
import Route from '../route';
import FlowController from '../../controllers/flow.controller';
import validation from '../../middlewares/validation.middleware';


class FlowsRoute extends Route {

  // --------------------------------------------------------------------------
  //         Attributes
  // --------------------------------------------------------------------------
  private readonly flowController: FlowController;


  // --------------------------------------------------------------------------
  //         Constructor
  // --------------------------------------------------------------------------
  constructor() {
    super();
    this.flowController = new FlowController();
  }


  // --------------------------------------------------------------------------
  //         Methods
  // --------------------------------------------------------------------------
  protected buildRoutes(router: any) {
    router.post(
      '/create', 
      passport.authenticate('jwt'), 
      validation(this.validationService.validateRequestCreateFlow),
      this.flowController.create
    );
    router.get(
      '/mines', 
      passport.authenticate('jwt'), 
      this.flowController.getAll
    );
    router.get(
      '/mines/:uid', 
      passport.authenticate('jwt'), 
      validation(this.validationService.validateRequestFlow),
      this.flowController.get
    );
    router.delete(
      '/mines/:uid', 
      passport.authenticate('jwt'), 
      validation(this.validationService.validateRequestFlow),
      this.flowController.remove
    );
    router.options('*', cors());
  }
}

export default FlowsRoute;
