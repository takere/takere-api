import Edge from "../domain/edge.domain";

export default interface EdgeRepository {
  save(edge: Edge): Edge;
}
