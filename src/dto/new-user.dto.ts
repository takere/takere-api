/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

interface NewUserDTO {
  firstName: string,
  lastName: string,
  password: string,
  role: string,
  email: string,
  profileUrl: string
}

export default NewUserDTO;
