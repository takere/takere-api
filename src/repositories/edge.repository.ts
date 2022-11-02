import Edge from '../domain/edge.domain';
import EdgeDTO from '../dto/edge.dto';

interface EdgeRepository {
  save(edge: EdgeDTO): Promise<Edge>;
  find(fields: object): Promise<Edge[]>;
  deleteMany(fields: object): Promise<Edge[]>;
}

export default EdgeRepository;
