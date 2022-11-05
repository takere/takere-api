import Node from "../domain/node.domain";

interface UserBoardDTO {
  id: string,
  name: string,
  description: string,
  node: Node,
  finished: any,
}

export default UserBoardDTO;

