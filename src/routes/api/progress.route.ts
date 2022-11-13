/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import passport from 'passport';
import cors from 'cors';
import Route from '../route';
import ProgressController from '../../controllers/progress.controller';
import validation from '../../middlewares/validation.middleware';


class ProgressRoute extends Route {

  // --------------------------------------------------------------------------
  //         Attributes
  // --------------------------------------------------------------------------
  private readonly progressController: ProgressController;


  // --------------------------------------------------------------------------
  //         Constructor
  // --------------------------------------------------------------------------
  constructor() {
    super();
    this.progressController = new ProgressController();
  }


  // --------------------------------------------------------------------------
  //         Methods
  // --------------------------------------------------------------------------
  protected buildRoutes(router: any) {
    router.get(
      '/', 
      passport.authenticate('jwt'), 
      validation(this.validationService.validateRequestProgress),
      this.progressController.getProgress
    );
    router.get(
      '/patients', 
      passport.authenticate('jwt'), 
      this.progressController.getPatientsProgress
    );
    router.get(
      '/patients/:patientId/:flowId', 
      passport.authenticate('jwt'), 
      validation(this.validationService.validateRequestPatientProgress),
      this.progressController.getPatientProgress
    );
    router.options('*', cors());
  }
}

export default ProgressRoute;
