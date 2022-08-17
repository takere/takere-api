import NodeRepository from "./node.repository";
import UserRepository from "./user.repository";

export default interface Repository {
  userRepository: UserRepository,
  nodeRepository: NodeRepository
}
