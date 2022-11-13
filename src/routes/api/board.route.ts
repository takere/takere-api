/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import passport from 'passport';
import cors from 'cors';
import Route from '../route';
import BoardController from '../../controllers/board.controller';
import validation from '../../middlewares/validation.middleware';


class BoardRoute extends Route {

  // --------------------------------------------------------------------------
  //         Attributes
  // --------------------------------------------------------------------------
  private readonly boardController: BoardController;


  // --------------------------------------------------------------------------
  //         Constructor
  // --------------------------------------------------------------------------
  constructor() {
    super();
    this.boardController = new BoardController();
  }


  // --------------------------------------------------------------------------
  //         Methods
  // --------------------------------------------------------------------------
  protected buildRoutes(router: any) {
    router.get(
      '/me', 
      passport.authenticate('jwt'), 
      validation(this.validationService.validateRequestGetBoard),
      this.boardController.get
    );
    router.post(
      '/resolve', 
      passport.authenticate('jwt'), 
      validation(this.validationService.validateRequestResolveBoard),
      this.boardController.resolve
    );
    router.options('*', cors());
  }
}

export default BoardRoute;
