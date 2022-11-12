import User from '../domain/user.domain';
import NewUserDTO from '../dto/new-user.dto';

interface UserRepository {
  save(user: NewUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
}

export default UserRepository;
