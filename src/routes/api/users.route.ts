import UserController from '../../controllers/user.controller';
import Route from '../route';
import validation from '../../middlewares/validation.middleware';
import userCreationErrorHandler from '../../filters/user-creation.filter';
import logoutErrorHandler from '../../filters/logout.filter';

class UsersRoute extends Route {
  private readonly userController: UserController;
  
  constructor(express: any, cors: any, passport: any) {
    super(express, cors, passport);
    this.userController = new UserController();
  }

  protected buildRoutes(router: any) {
    router.post(
      '/create', 
      validation(this.validationService.validateRequestCreateUser),
      (req: any, res: any, next: any) => this.userController.createUser(req, res, next),
      (err: any, req: any, res: any, next: any) => userCreationErrorHandler(err, req, res, next),
    );
    router.post(
      '/login', 
      validation(this.validationService.validateRequestLogin),
      this.passport.authenticate('local'),
      (req: any, res: any, next: any) => this.userController.login(req, res, next)
    );
    router.get(
      '/logout',
      (req: any, res: any, next: any) => this.userController.logout(req, res, next),
      (err: any, req: any, res: any, next: any) => logoutErrorHandler(err, req, res, next),
    );
    router.options('*', this.cors());
  }
}

export default UsersRoute;
