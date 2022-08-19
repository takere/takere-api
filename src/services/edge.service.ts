
import Edge from "../domain/edge.domain";
import EdgeRepository from "../repositories/edge.repository";

const repository = require('../repositories');

class EdgeService {
  private edgeRepository: EdgeRepository; 

  constructor() {
    this.edgeRepository = repository.edgeRepository;
  }

  async findAllBySourceId(id: string): Promise<Edge[]> {
    return this.edgeRepository.find({ source: id });
  }

  async findAllByUserId(id: string): Promise<Edge[]> {
    return this.edgeRepository.find({ user: id });
  }

  async findAllByFlowId(id: string): Promise<Edge[]> {
    return this.edgeRepository.find({ flow: id });
  }

  async removeAllWithFlowId(id: string): Promise<Edge[]> {
    return this.edgeRepository.deleteMany({ flow: id });
  }

  async insert(edge: Edge): Promise<Edge> {
    return this.edgeRepository.save({ ...edge, id: undefined });
  }
}

module.exports = new EdgeService();
