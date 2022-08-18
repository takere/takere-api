import User from "../../../domain/user.domain";
import UserRepository from "../../user.repository";

class UserCollection implements UserRepository {
  private _schema: any;

  constructor() {
    this._schema = require('../schemas/user.schema');
  }

  public async findOne(fields: object): Promise<User> {
    const storedUser = await this._schema.findOne(fields);

    return { ...storedUser._doc, id: storedUser._doc._id };
  }

  public async save(user: User): Promise<User> {
    const targetUser = new this._schema(user);
    const storedUser = await targetUser.save();

    return { ...storedUser, id: storedUser._id };
  }
}

module.exports = UserCollection;
