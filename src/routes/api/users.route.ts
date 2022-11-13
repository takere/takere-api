/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import passport from 'passport';
import cors from 'cors';
import Route from '../route';
import UserController from '../../controllers/user.controller';
import validation from '../../middlewares/validation.middleware';
import userCreationErrorHandler from '../../filters/user-creation.filter';
import logoutErrorHandler from '../../filters/logout.filter';


class UsersRoute extends Route {

  // --------------------------------------------------------------------------
  //         Attributes
  // --------------------------------------------------------------------------
  private readonly userController: UserController;
  

  // --------------------------------------------------------------------------
  //         Constructor
  // --------------------------------------------------------------------------
  constructor() {
    super();
    this.userController = new UserController();
  }


  // --------------------------------------------------------------------------
  //         Methods
  // --------------------------------------------------------------------------
  protected buildRoutes(router: any) {
    router.post(
      '/create', 
      validation(this.validationService.validateRequestCreateUser),
      this.userController.createUser,
      userCreationErrorHandler
    );
    router.post(
      '/login', 
      validation(this.validationService.validateRequestLogin),
      passport.authenticate('local'),
      this.userController.login
    );
    router.get(
      '/logout',
      this.userController.logout,
      logoutErrorHandler,
    );
    router.options('*', cors());
  }
}

export default UsersRoute;
