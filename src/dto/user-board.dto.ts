interface UserBoardDTO {
  id: string,
  name: string,
  description: string,
  node: { 
    id: string, 
    results: any,
    type: string,
    icon: string,
    bgColor: string
  },
  finished: { 
    id: string, 
    executedAt: string, 
    result: any 
  },
}

export = UserBoardDTO;

