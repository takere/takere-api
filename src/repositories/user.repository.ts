import User from "../domain/user.domain";

export default interface UserRepository {
  save(user: User): Promise<User>;
  findOne(fields: object): Promise<User>;
}
