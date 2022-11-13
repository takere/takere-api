/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import UserRepository from './user.repository';
import NodeRepository from './node.repository';
import FlowRepository from './flow.repository';
import FinishedRepository from './finished.repository';
import BoardRepository from './board.repository';
import EdgeRepository from './edge.repository';


interface Repository {
  userRepository: UserRepository,
  nodeRepository: NodeRepository,
  flowRepository: FlowRepository,
  finishedRepository: FinishedRepository,
  boardRepository: BoardRepository,
  edgeRepository: EdgeRepository
}

export default Repository;
