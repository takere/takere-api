import BoardController from '../../controllers/board.controller';
import Route from '../route';
import validation from '../../middlewares/validation.middleware';

class BoardRoute extends Route {
  private readonly boardController: BoardController;

  constructor(express: any, cors: any, passport: any) {
    super(express, cors, passport);

    this.boardController = new BoardController();
  }

  protected buildRoutes(router: any) {
    router.get(
      '/me', 
      this.passport.authenticate('jwt'), 
      validation(this.validationService.validateRequestGetBoard),
      (req: any, res: any, next: any) => this.boardController.get(req, res, next)
    );
    router.post(
      '/resolve', 
      this.passport.authenticate('jwt'), 
      validation(this.validationService.validateRequestResolveBoard),
      (req: any, res: any, next: any) => this.boardController.resolve(req, res, next)
    );
    router.options('*', this.cors());
  }
}

export default BoardRoute;
