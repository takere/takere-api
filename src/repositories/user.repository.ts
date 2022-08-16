import User from "../domain/user.domain";

export default interface UserRepository {
  findByEmail(email: string): User;
  findById(id: string): User;
  save(user: User): User;
}
