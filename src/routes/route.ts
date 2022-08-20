abstract class Route {
  express: any;
  cors: any;
  passport: any;
  
  constructor(express: any, cors: any, passport: any) {
    this.express = express;
    this.cors = cors;
    this.passport = passport;
  }

  public build() {
    const router = this.express.Router();

    this.buildRoutes(router);

    return router;
  }

  protected abstract buildRoutes(router: any): void;
}

export = Route;
