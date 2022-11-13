/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Node from "../domain/node.domain";


interface UserBoardDTO {
  id: string,
  name: string,
  description: string,
  node: Node,
  finished: any,
}

export default UserBoardDTO;

