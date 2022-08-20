import UserRepository = require('./user.repository');
import NodeRepository = require('./node.repository');

interface Repository {
  userRepository: UserRepository,
  nodeRepository: NodeRepository
}

export = Repository;
