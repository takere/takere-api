import Edge = require('../domain/edge.domain');

interface EdgeRepository {
  save(edge: Edge): Promise<Edge>;
  find(fields: object): Promise<Edge[]>;
  deleteMany(fields: object): Promise<Edge[]>;
}

export = EdgeRepository;
