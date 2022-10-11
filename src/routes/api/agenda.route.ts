import AgendaController = require('../../controllers/agenda.controller');
import Route = require('../route');
import validation = require('../../middlewares/validation.middleware');

class AgendaRoute extends Route {
  private readonly agendaController: AgendaController;

  constructor(express: any, cors: any, passport: any) {
    super(express, cors, passport);

    this.agendaController = new AgendaController();
  }

  protected buildRoutes(router: any) {
    router.get(
      '/today', 
      this.passport.authenticate('jwt'), 
      validation(this.validationService.validateRequestGetAgenda),
      (req: any, res: any, next: any) => this.agendaController.getToday(req, res, next)
    );
    router.get(
      '/tomorrow', 
      this.passport.authenticate('jwt'), 
      validation(this.validationService.validateRequestGetAgenda),
      (req: any, res: any, next: any) => this.agendaController.getTomorrow(req, res, next)
    );
    router.options('*', this.cors());
  }
}

export = AgendaRoute;
