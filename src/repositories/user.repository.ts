import User from "../domain/user.domain";

export default interface UserRepository {
  findOne(fields: object): User;
  save(user: User): User;
}
