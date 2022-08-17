import User from "../domain/user.domain";
import UserDTO from '../dto/user.dto';
import Repository from "../repositories/repository";
import UserRepository from "../repositories/user.repository";

const bcrypt = require('bcrypt');
const generalConfig = require('../config/general.config');

export class UserService {
  userRepository: UserRepository; 

  constructor(repository: Repository) {
    this.userRepository = repository.userRepository;
  }

  findByEmail(email: string): Promise<User> {

  }

  findById(id: string): Promise<User> {

  }

  async createUser(user: UserDTO): Promise<User> {
    const salt = await bcrypt.genSaltSync(parseInt(generalConfig.BCRYPT_SALT));
    const hashedPassword = await bcrypt.hashSync(user.password, salt);
    const newUser: User = { ...user, password: hashedPassword, role: 'user', _id: undefined };

    return this.userRepository.save(newUser);
  }
}
