import Service = require('./service');
import User = require('../domain/user.domain');
import NewUserDTO = require('../dto/new-user.dto');
import UserDTO = require('../dto/user.dto');
import UserRepository = require('../repositories/user.repository');
import CreatedUserDTO = require('../dto/created-user.dto');

class UserService extends Service {
  private userRepository: UserRepository;
  private bcrypt: any;
  private generalConfig: any;
  private jwt: any;

  constructor() {
    super();
    this.userRepository = this.repository.userRepository;
    this.bcrypt = require('bcrypt');
    this.generalConfig = require('../config/general.config');
    this.jwt = require('jsonwebtoken');
  }

  public async login(userData: UserDTO) {
    return this.jwt.sign({
      data: userData
    }, 
    this.generalConfig.token_secret, {
      expiresIn: '2y'
    });
  }

  public async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ email });
  }

  public async findById(id: string): Promise<User> {
    return await this.userRepository.findOne({ _id: id });
  }

  public async createUser(user: NewUserDTO): Promise<CreatedUserDTO> {
    if(!this.validateEmail(user.email)) {
      throw new Error('Invalid Email');
    }

    if(user.password.length < 3) {
      throw new Error('Password is too small');
    }

    const salt = await this.bcrypt.genSaltSync(parseInt(this.generalConfig.BCRYPT_SALT));
    const hashedPassword = await this.bcrypt.hashSync(user.password, salt);
    const newUser: NewUserDTO = { ...user, password: hashedPassword, role: 'user' };
    const createdUser = await this.userRepository.save(newUser);

    const token = this.jwt.sign({
      data: createdUser
    }, 
    this.generalConfig.token_secret, {
      expiresIn: '2y'
    });

    return {
      ...createdUser,
      token
    }
  }

  private validateEmail(email: string) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
}

export = UserService;
