import Node from "../domain/node.domain";

interface UserBoardDTO {
  id: string,
  name: string,
  description: string,
  node: Node,
  finished: { 
    id: string, 
    at: string, 
    result: any 
  },
}

export = UserBoardDTO;

