import User = require('../domain/user.domain');
import NewUserDTO = require('../dto/new-user.dto');

interface UserRepository {
  save(user: NewUserDTO): Promise<User>;
  findOne(fields: object): Promise<User>;
}

export = UserRepository;
