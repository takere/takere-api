import Route from "../route";

const userController = require('../../controllers/user.controller');

class UsersRoute extends Route {
    constructor(express: any, cors: any, passport: any) {
      super(express, cors, passport);
    }
  
    public buildRoutes(router: any) {
      router.post('/create', userController.createUser);
      router.post('/login', this.passport.authenticate('local'), userController.login);
      router.get('/me', this.passport.authenticate('jwt') , userController.getUser);
      router.get('/logout', userController.logout);
      router.options('*', this.cors());
    }
  }
  
  module.exports = UsersRoute;
