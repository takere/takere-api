import UserRepository = require('./user.repository');
import NodeRepository = require('./node.repository');
import FlowRepository = require('./flow.repository');
import FinishedRepository = require('./finished.repository');
import BoardRepository = require('./board.repository');
import EdgeRepository = require('./edge.repository');

interface Repository {
  userRepository: UserRepository,
  nodeRepository: NodeRepository,
  flowRepository: FlowRepository,
  finishedRepository: FinishedRepository,
  boardRepository: BoardRepository,
  edgeRepository: EdgeRepository
}

export = Repository;
