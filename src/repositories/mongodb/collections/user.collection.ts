/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import mongoose from "mongoose";
import UserRepository from '../../user.repository';
import User from '../../../domain/user.domain';
import NewUserDTO from '../../../dto/new-user.dto';
import UserSchema from '../schemas/user.schema';


class UserCollection implements UserRepository {

  // --------------------------------------------------------------------------
  //         Attributes
  // --------------------------------------------------------------------------
  private readonly schema: any;


  // --------------------------------------------------------------------------
  //         Constructor
  // --------------------------------------------------------------------------
  constructor() {
    this.schema = mongoose.model<User>("User", UserSchema);
  }


  // --------------------------------------------------------------------------
  //         Methods
  // --------------------------------------------------------------------------
  public async findByEmail(email: string): Promise<User> {
    const user = await this.schema.findOne({ email });

    if (user._doc) {
      return { ...user._doc, id: user._doc._id };
    }

    return { ...user, id: user._id };
  }

  public async findById(id: string): Promise<User> {
    const user = await this.schema.findOne({ _id: id });

    if (user._doc) {
      return { ...user._doc, id: user._doc._id };
    }

    return { ...user, id: user._id };
  }

  public async save(user: NewUserDTO): Promise<User> {
    const targetUser = new this.schema({ ...user, id: undefined });
    const storedUser = await targetUser.save();

    return { ...storedUser, id: storedUser._id };
  }
}

export default UserCollection;
