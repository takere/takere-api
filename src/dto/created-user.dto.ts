/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

interface CreatedUserDTO {
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  profileUrl: string,
  token: string
}

export default CreatedUserDTO;
