interface BoardDTO {
  name: string,
  description: string,
  userEmail: string,
  flow: string,
  node: string,
  executed: any,
  completed: boolean
}

export = BoardDTO;
