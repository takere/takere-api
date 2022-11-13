/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

interface UserDTO {
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  profileUrl: string,
  createdAt: string,
  updatedAt: string
}

export default UserDTO;
