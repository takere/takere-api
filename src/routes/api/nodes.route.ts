import NodeController from '../../controllers/node.controller';
import Route from '../route';
import validation from '../../middlewares/validation.middleware';

class NodesRoute extends Route {
  private readonly nodeController: NodeController;

  constructor(express: any, cors: any, passport: any) {
    super(express, cors, passport);
    this.nodeController = new NodeController();
  }

  protected buildRoutes(router: any) {
    router.get(
      '/me', 
      this.passport.authenticate('jwt'), 
      (req: any, res: any, next: any) => this.nodeController.get(req, res, next)
    );
    router.get(
      '/connections', 
      this.passport.authenticate('jwt'), 
      (req: any, res: any, next: any) => this.nodeController.getAllConnections(req, res, next)
    );
    router.options('*', this.cors());
  }
}

export default NodesRoute;
