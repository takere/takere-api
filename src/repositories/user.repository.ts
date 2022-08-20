import User = require('../domain/user.domain');
import UserDTO = require('../dto/user.dto');

interface UserRepository {
  save(user: UserDTO): Promise<User>;
  findOne(fields: object): Promise<User>;
}

export = UserRepository;
