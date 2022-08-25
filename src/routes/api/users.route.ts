import UserController = require('../../controllers/user.controller');
import Route = require('../route');

class UsersRoute extends Route {
  private readonly userController: UserController;

  constructor(express: any, cors: any, passport: any) {
    super(express, cors, passport);
    this.userController = new UserController();
  }

  protected buildRoutes(router: any) {
    router.post(
      '/create', 
      (req: any, res: any, next: any) => this.userController.createUser(req, res, next)
    );
    router.post(
      '/login', 
      this.passport.authenticate('local'), 
      (req: any, res: any, next: any) => this.userController.login(req, res, next)
    );
    router.get(
      '/logout', 
      (req: any, res: any, next: any) => this.userController.logout(req, res, next)
    );
    router.options('*', this.cors());
  }
}

export = UsersRoute;
