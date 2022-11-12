/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Service from './service';
import User from '../domain/user.domain';
import NewUserDTO from '../dto/new-user.dto';
import UserDTO from '../dto/user.dto';
import UserRepository from '../repositories/user.repository';
import CreatedUserDTO from '../dto/created-user.dto';
import bcrypt from 'bcrypt';
import generalConfig from '../config/general.config';
import jwt from 'jsonwebtoken';


/**
 * Responsible for providing user and authentication services.
 */
class UserService extends Service {

  // --------------------------------------------------------------------------
  //         Attributes
  // --------------------------------------------------------------------------
  private userRepository: UserRepository;
  private bcrypt: any;
  private generalConfig: any;


  // --------------------------------------------------------------------------
  //         Constructor
  // --------------------------------------------------------------------------
  constructor() {
    super();
    this.userRepository = this.repository.userRepository;
    this.bcrypt = bcrypt;
    this.generalConfig = generalConfig;
  }


  // --------------------------------------------------------------------------
  //         Methods
  // --------------------------------------------------------------------------
  public async login(userData: User | UserDTO): Promise<string> {
    return jwt.sign(
      { data: userData }, 
      this.generalConfig.token_secret, 
      { expiresIn: '2y' }
    );
  }

  public async findByEmail(email: string): Promise<User> {
    return this.userRepository.findByEmail(email);
  }

  public async findById(id: string): Promise<User> {
    return this.userRepository.findById(id);
  }

  public async createUser(user: NewUserDTO): Promise<CreatedUserDTO> {
    if(!this.validateEmail(user.email)) {
      throw new Error('Invalid Email');
    }

    if(user.password.length < 3) {
      throw new Error('Password is too small');
    }

    const createdUser = await this.storeUser(user);
    const token = await this.login(createdUser);

    return {
      ...createdUser,
      token
    }
  }

  private validateEmail(email: string) {
    const re = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;
    return re.test(String(email).toLowerCase());
  }

  private async storeUser(user: NewUserDTO) {
    const hashedPassword = await this.encryptUserPassword(user);
    const newUser: NewUserDTO = { 
      ...user, 
      password: hashedPassword, 
      role: 'user' 
    };
    
    return this.userRepository.save(newUser);
  }

  private async encryptUserPassword(user: NewUserDTO) {
    const salt = await this.bcrypt.genSaltSync(
      parseInt(this.generalConfig.BCRYPT_SALT)
    );
    
    return this.bcrypt.hashSync(user.password, salt);
  }
}

export default UserService;
