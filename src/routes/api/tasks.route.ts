import Route from "../route";

const taskController = require('../../controllers/task.controller');

class TasksRoute extends Route {
  constructor(express: any, cors: any, passport: any) {
    super(express, cors, passport);
  }

  protected buildRoutes(router: any) {
    router.post('/create', this.passport.authenticate('jwt'), taskController.create);
    router.get('/mines', this.passport.authenticate('jwt'), taskController.getAll);
    router.get('/mine', this.passport.authenticate('jwt'), taskController.get);
    router.options('*', this.cors());
  }
}

module.exports = TasksRoute;
