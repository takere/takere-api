import User from '../domain/user.domain';
import NewUserDTO from '../dto/new-user.dto';

interface UserRepository {
  save(user: NewUserDTO): Promise<User>;
  findOne(fields: object): Promise<User>;
}

export default UserRepository;
