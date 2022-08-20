import Flow = require('../domain/flow.domain');
import FlowDTO = require('../dto/flow.dto');

interface FlowRepository {
  findOne(fields: object): Promise<Flow>;
  find(fields: object): Promise<Flow[]>;
  findOneAndRemove(fields: object): Promise<Flow>;
  save(flow: FlowDTO): Promise<Flow>;
}

export = FlowRepository;
