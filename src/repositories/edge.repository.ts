import Edge = require('../domain/edge.domain');
import EdgeDTO = require('../dto/edge.dto');

interface EdgeRepository {
  save(edge: EdgeDTO): Promise<Edge>;
  find(fields: object): Promise<Edge[]>;
  deleteMany(fields: object): Promise<Edge[]>;
}

export = EdgeRepository;
