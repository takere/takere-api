import ProgressController from '../../controllers/progress.controller';
import Route from '../route';
import validation from '../../middlewares/validation.middleware';

class ProgressRoute extends Route {
  private readonly progressController: ProgressController;

  constructor(express: any, cors: any, passport: any) {
    super(express, cors, passport);

    this.progressController = new ProgressController();
  }

  protected buildRoutes(router: any) {
    router.get(
      '/', 
      this.passport.authenticate('jwt'), 
      validation(this.validationService.validateRequestProgress),
      (req: any, res: any, next: any) => this.progressController.getProgress(req, res, next)
    );
    router.get(
      '/patients', 
      this.passport.authenticate('jwt'), 
      (req: any, res: any, next: any) => this.progressController.getPatientsProgress(req, res, next)
    );
    router.get(
      '/patients/:patientId/:flowId', 
      this.passport.authenticate('jwt'), 
      validation(this.validationService.validateRequestPatientProgress),
      (req: any, res: any, next: any) => this.progressController.getPatientProgress(req, res, next)
    );
    router.options('*', this.cors());
  }
}

export default ProgressRoute;
