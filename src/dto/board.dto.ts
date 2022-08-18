export default interface BoardDTO {
  name: string,
  description: string,
  userEmail: string,
  flow: string,
  node: string,
  executed: string | undefined
}
