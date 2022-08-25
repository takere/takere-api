interface UserBoardDTO {
  id: string,
  name: string,
  description: string,
  type: string,
  icon: string,
  content: any,
  executed: { id: string, executedAt: string, result: any },
  node: { id: string, results: any }
}

export = UserBoardDTO;

