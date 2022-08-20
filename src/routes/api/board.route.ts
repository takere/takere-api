import Route from "../route";

const boardController = require('../../controllers/board.controller');

class BoardRoute extends Route {
  constructor(express: any, cors: any, passport: any) {
    super(express, cors, passport);
  }

  protected buildRoutes(router: any) {
    router.get('/me', this.passport.authenticate('jwt'), boardController.get);
    router.post('/resolve', this.passport.authenticate('jwt'), boardController.resolve);
    router.options('*', this.cors());
  }
}

module.exports = BoardRoute;
