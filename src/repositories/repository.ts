import UserRepository = require('./user.repository');
import NodeRepository = require('./node.repository');
import FlowRepository = require('./flow.repository');
import ExecutedRepository = require('./executed.repository');
import BoardRepository = require('./board.repository');
import EdgeRepository = require('./edge.repository');

interface Repository {
  userRepository: UserRepository,
  nodeRepository: NodeRepository,
  flowRepository: FlowRepository,
  executedRepository: ExecutedRepository,
  boardRepository: BoardRepository,
  edgeRepository: EdgeRepository
}

export = Repository;
