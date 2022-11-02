import ValidationService from '../services/validation.service';

abstract class Route {
  protected readonly validationService: ValidationService;
  express: any;
  cors: any;
  passport: any;

  
  constructor(express: any, cors: any, passport: any) {
    this.express = express;
    this.cors = cors;
    this.passport = passport;
    this.validationService = new ValidationService();
  }

  public build() {
    const router = this.express.Router();

    this.buildRoutes(router);

    return router;
  }

  protected abstract buildRoutes(router: any): void;
}

export default Route;
