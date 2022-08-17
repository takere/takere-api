import Flow from "../domain/flow.domain";

export default interface FlowRepository {
  findOne(fields: object): Flow;
  save(flow: Flow): Flow;
}
