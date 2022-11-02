import UserRepository from '../../user.repository';
import User from '../../../domain/user.domain';
import NewUserDTO from '../../../dto/new-user.dto';
import userSchema from '../schemas/user.schema';

class UserCollection implements UserRepository {
  private _schema: any;

  constructor() {
    this._schema = userSchema;
  }

  public async findOne(fields: object): Promise<User> {
    const user = await this._schema.findOne(fields);

    if (user._doc) {
      return { ...user._doc, id: user._doc._id };
    }

    return { ...user, id: user._id };
  }

  public async save(user: NewUserDTO): Promise<User> {
    const targetUser = new this._schema({ ...user, id: undefined });
    const storedUser = await targetUser.save();

    return { ...storedUser, id: storedUser._id };
  }
}

export = UserCollection;
