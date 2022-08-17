export default interface Board {
  _id: string | undefined,
  name: string,
  description: string,
  userEmail: string,
  flow: any,
  node: any,
  executed: any,
  completed: boolean
}
