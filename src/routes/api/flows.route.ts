import FlowController = require('../../controllers/flow.controller');
import Route = require('../route');
import validation = require('../../middlewares/validation.middleware');

class FlowsRoute extends Route {
  private readonly flowController: FlowController;

  constructor(express: any, cors: any, passport: any) {
    super(express, cors, passport);
    this.flowController = new FlowController();
  }

  protected buildRoutes(router: any) {
    router.post(
      '/create', 
      this.passport.authenticate('jwt'), 
      validation(this.validationService.validateRequestCreateFlow),
      (req: any, res: any, next: any) => this.flowController.create(req, res, next)
    );
    router.get(
      '/mines', 
      this.passport.authenticate('jwt'), 
      (req: any, res: any, next: any) => this.flowController.getAll(req, res, next)
    );
    router.get(
      '/mines/:uid', 
      this.passport.authenticate('jwt'), 
      validation(this.validationService.validateRequestFlow),
      (req: any, res: any, next: any) => this.flowController.get(req, res, next)
    );
    router.delete(
      '/mines/:uid', 
      this.passport.authenticate('jwt'), 
      validation(this.validationService.validateRequestFlow),
      (req: any, res: any, next: any) => this.flowController.remove(req, res, next)
    );
    router.options('*', this.cors());
  }
}

export = FlowsRoute;
