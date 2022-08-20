interface Board {
  id: string | undefined,
  name: string,
  description: string,
  userEmail: string,
  flow: any,
  node: any,
  executed: any | undefined,
  completed: boolean
}

export = Board;
