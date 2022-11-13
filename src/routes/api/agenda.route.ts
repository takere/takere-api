/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import passport from 'passport';
import cors from 'cors';
import Route from '../route';
import AgendaController from '../../controllers/agenda.controller';
import validation from '../../middlewares/validation.middleware';


class AgendaRoute extends Route {

  // --------------------------------------------------------------------------
  //         Attributes
  // --------------------------------------------------------------------------
  private readonly agendaController: AgendaController;


  // --------------------------------------------------------------------------
  //         Constructor
  // --------------------------------------------------------------------------
  constructor() {
    super();
    this.agendaController = new AgendaController();
  }


  // --------------------------------------------------------------------------
  //         Methods
  // --------------------------------------------------------------------------
  protected buildRoutes(router: any) {
    router.get(
      '/today', 
      passport.authenticate('jwt'), 
      validation(this.validationService.validateRequestGetAgenda),
      this.agendaController.getToday
    );
    router.get(
      '/tomorrow', 
      passport.authenticate('jwt'), 
      validation(this.validationService.validateRequestGetAgenda),
      this.agendaController.getTomorrow
    );
    router.options('*', cors());
  }
}

export default AgendaRoute;
