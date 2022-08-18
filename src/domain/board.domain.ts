export default interface Board {
  id: string | undefined,
  name: string,
  description: string,
  userEmail: string,
  flow: string,
  node: string,
  executed: string | undefined,
  completed: boolean
}
