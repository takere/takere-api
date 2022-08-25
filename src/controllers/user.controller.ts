import NewUserDTO = require('../dto/new-user.dto');
import UserDTO = require('../dto/user.dto');
import UserService = require('../services/user.service');

class UserController {
  userService: UserService;
  logger: any;

  constructor() {
    this.userService = new UserService();
    this.logger = require('../config/logger.config');
  }

  public async login(req: any, res: any, next: any) {
    const user = await req.user;
  
    const userData: UserDTO = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      profileUrl: user.profileUrl,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }
    const token = this.userService.login(userData);
  
    res.send({
      status: 200,
      message: 'Login feito com sucesso!',
      token
    });
  }

  // public async getUser(req: any, res: any, next: any) {
  //   let user = await req.user;

  //   res.send({status: 200, message: 'ok', data: {
  //     id: user.id,
  //     firstName: user.firstName,
  //     lastName: user.lastName,
  //     email: user.email,
  //     profileUrl: user.profileUrl,
  //     createdAt: user.createdAt,
  //   }})
  // }

  public async createUser(req: any, res: any, next: any) {
    try {
      const {firstName, lastName, password, email} = req.body
      const userData: NewUserDTO = {
        firstName,
        lastName,
        password,
        role: 'user',
        email,
        profileUrl: `https://api.adorable.io/avatars/285/${email}`
      }
      const createdUser = await this.userService.createUser(userData);

      res.send(createdUser)
    } 
    catch (e: any) {
      if (e.name === 'MongoError' && e.code === 11000) {
        this.logger.error('Mongoose Error', e)
        
        if("email" in e.keyValue){
          res.status(400).send({ msg: `Email ${e.keyValue.email} already exist!`, status: 401, field: 'email' });
        }
      } 
      else {
        this.logger.error('Unable to Create User', e)
        res.status(400).send({msg: e.message || 'Unable To Create User', status: 400})
      }
    }
  }
  
  public async logout(req: any, res: any, next: any) {
    req.logout();
    req.session.destroy(function (err: any) {
      if (!err) {
        res.status(200).clearCookie('connect.sid', {path: '/'}).json({status: "Success"});
      } 
      else {
        // handle error case...
        console.log(res)
      }
  
    });
  }
}

export = UserController;
