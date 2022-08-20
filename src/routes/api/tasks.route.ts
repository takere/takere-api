import TaskController = require('../../controllers/task.controller');
import Route = require('../route');

class TasksRoute extends Route {
  taskController: any;

  constructor(express: any, cors: any, passport: any) {
    super(express, cors, passport);
    this.taskController = new TaskController;
  }

  protected buildRoutes(router: any) {
    router.post(
      '/create', 
      this.passport.authenticate('jwt'), 
      (req: any, res: any, next: any) => this.taskController.create(req, res, next)
    );
    router.get(
      '/mines', 
      this.passport.authenticate('jwt'), 
      (req: any, res: any, next: any) => this.taskController.getAll(req, res, next)
    );
    router.get(
      '/mine', 
      this.passport.authenticate('jwt'), 
      (req: any, res: any, next: any) => this.taskController.get(req, res, next)
    );
    router.options('*', this.cors());
  }
}

export = TasksRoute;
