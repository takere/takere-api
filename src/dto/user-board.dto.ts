interface UserBoardDTO {
  id: string,
  name: string,
  description: string,
  node: any,
  finished: { 
    id: string, 
    at: string, 
    result: any 
  },
}

export = UserBoardDTO;

