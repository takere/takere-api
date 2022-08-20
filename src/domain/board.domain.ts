interface Board {
  id: string,
  name: string,
  description: string,
  userEmail: string,
  flow: any,
  node: any,
  executed: any | undefined,
  completed: boolean
}

export = Board;
