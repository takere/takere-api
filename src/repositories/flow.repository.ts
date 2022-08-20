import Flow = require('../domain/flow.domain');

interface FlowRepository {
  findOne(fields: object): Promise<Flow>;
  find(fields: object): Promise<Flow[]>;
  findOneAndRemove(fields: object): Promise<Flow>;
  save(flow: Flow): Promise<Flow>;
}

export = FlowRepository;
