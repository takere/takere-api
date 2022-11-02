import Flow from '../domain/flow.domain';
import FlowDTO from '../dto/flow.dto';

interface FlowRepository {
  findOne(fields: object): Promise<Flow>;
  find(fields: object): Promise<Flow[]>;
  findOneAndRemove(fields: object): Promise<Flow>;
  save(flow: FlowDTO): Promise<Flow>;
}

export default FlowRepository;
