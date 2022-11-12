import Flow from '../domain/flow.domain';
import FlowDTO from '../dto/flow.dto';

interface FlowRepository {
  findByAuthorAndFlow(authorId: string, flowId: string): Promise<Flow>;
  findAllByAuthor(authorId: string): Promise<Flow[]>;
  findById(id: string): Promise<Flow>;
  removeByAuthorAndFlow(authorId: string, flowId: string): Promise<Flow>;
  save(flow: FlowDTO): Promise<Flow>;
}

export default FlowRepository;
