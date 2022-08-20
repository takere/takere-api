import Service = require('./service');
import User = require('../domain/user.domain');
import UserDTO = require('../dto/user.dto');
import UserRepository = require('../repositories/user.repository');

class UserService extends Service {
  private userRepository: UserRepository;
  private bcrypt: any;
  private generalConfig: any;

  constructor() {
    super();
    this.userRepository = this.repository.userRepository;
    this.bcrypt = require('bcrypt');
    this.generalConfig = require('../config/general.config');
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ email });
  }

  async findById(id: string): Promise<User> {
    return this.userRepository.findOne({ _id: id });
  }

  async createUser(user: UserDTO): Promise<User> {
    const salt = await this.bcrypt.genSaltSync(parseInt(this.generalConfig.BCRYPT_SALT));
    const hashedPassword = await this.bcrypt.hashSync(user.password, salt);
    const newUser: User = { ...user, password: hashedPassword, role: 'user', id: '' };

    return this.userRepository.save(newUser);
  }
}

export = UserService;
