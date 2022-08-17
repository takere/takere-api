export default interface Node {
  _id: string | undefined,
  type: string,
  data: object,
  position: object,
  flow: any
}
