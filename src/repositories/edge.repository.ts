import Edge from '../domain/edge.domain';
import EdgeDTO from '../dto/edge.dto';

interface EdgeRepository {
  save(edge: EdgeDTO): Promise<Edge>;
  findAllBySourceId(id: string): Promise<Edge[]>;
  findAllByUserId(id: string): Promise<Edge[]>;
  findAllByFlowId(id: string): Promise<Edge[]>;
  removeAllWithFlowId(id: string): Promise<Edge[]>;
}

export default EdgeRepository;
