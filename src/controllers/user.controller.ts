import UserService = require('../services/user.service');

class UserController {
  userService: any;
  logger: any;
  generalConfig: any;
  jwt: any;

  constructor() {
    this.userService = new UserService();
    this.logger = require('../config/logger.config');
    this.generalConfig = require('../config/general.config');
    this.jwt = require('jsonwebtoken');
  }

  public async login(req: any, res: any, next: any) {
    const user = await req.user;
  
    const userData = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      profileUrl: user.profileUrl,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
  
    }
    const token = this.jwt.sign({
      data: userData
    }, this.generalConfig.token_secret, {
      expiresIn: '2y'
    });
  
    res.send({
      status: 200,
      message: 'Login feito com sucesso!',
      token
    });
  }

  public async getUser(req: any, res: any, next: any) {
    let user = await req.user;
    res.send({status: 200, message: 'ok', data: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      profileUrl: user.profileUrl,
      createdAt: user.createdAt,
    }})
  }

  public async createUser(req: any, res: any, next: any) {
    try {
      const {firstName, lastName, password, email} = req.body
  
      if(!this.validateEmail(email)) throw new Error('Invalid Email')
      if(password.length < 3) throw new Error('Password is too small')
      const profileUrl = `https://api.adorable.io/avatars/285/${email}`
  
      const createdUser = await this.userService.createUser(firstName, lastName, password, email, profileUrl)
      const token = this.jwt.sign({
        data: createdUser
      }, process.env.TOKEN_SECRET, {
        expiresIn: '2y'
      });
      res.send({...createdUser, token})
    } catch (e: any) {
      if (e.name === 'MongoError' && e.code === 11000) {
        this.logger.error('Mongoose Error', e)
        if("email" in e.keyValue){
          res.status(400).send({ msg: `Email ${e.keyValue.email} already exist!`, status: 401, field: 'email' });
        }
      } else {
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
      } else {
        // handle error case...
        console.log(res)
      }
  
    });
  }

  private validateEmail(email: string) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
}

export = UserController;
