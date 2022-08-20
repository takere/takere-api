import User = require('../domain/user.domain');

interface UserRepository {
  save(user: User): Promise<User>;
  findOne(fields: object): Promise<User>;
}

export = UserRepository;
