import User from "../domain/user.domain";

export default interface UserRepository {
  save(user: User): User;
  findOne(fields: object): User;
}
