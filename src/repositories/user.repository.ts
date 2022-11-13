/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import User from '../domain/user.domain';
import NewUserDTO from '../dto/new-user.dto';


interface UserRepository {

  /**
   * Stores a new user or updates one if he/she already exists.
   * 
   * @param     user User to be created or updated
   * 
   * @return    Stored or updated user
   */
  save(user: NewUserDTO): Promise<User>;

  /**
   * Searches a user by email.
   * 
   * @param     email Email to be searched
   * 
   * @return    Stored user or null if there is no user with such email
   */
  findByEmail(email: string): Promise<User>;

  /**
   * Searches a user by identifier.
   * 
   * @param     id Identifier to be searched
   * 
   * @return    Stored user or null if there is no user with such identifier
   */
  findById(id: string): Promise<User>;
}

export default UserRepository;
