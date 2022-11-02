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
