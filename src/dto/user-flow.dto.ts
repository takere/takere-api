/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

interface UserFlowDTO {
  id: string,
  name: string,
  description: string,
  email: string,
  graph: any[]
}

export default UserFlowDTO;

