import User from "../domain/user.domain";
import UserDTO from '../dto/user.dto';
import UserRepository from "../repositories/user.repository";

const bcrypt = require('bcrypt');
const generalConfig = require('../config/general.config');
const repository = require('../repositories');

class UserService {
  private userRepository: UserRepository; 

  constructor() {
    this.userRepository = repository.userRepository;
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ email });
  }

  async findById(id: string): Promise<User> {
    return this.userRepository.findOne({ _id: id });
  }

  async createUser(user: UserDTO): Promise<User> {
    const salt = await bcrypt.genSaltSync(parseInt(generalConfig.BCRYPT_SALT));
    const hashedPassword = await bcrypt.hashSync(user.password, salt);
    const newUser: User = { ...user, password: hashedPassword, role: 'user', id: '' };

    return this.userRepository.save(newUser);
  }
}

module.exports = new UserService();
