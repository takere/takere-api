
import Edge from "../domain/edge.domain";
import EdgeRepository from "../repositories/edge.repository";

const repository = require('../repositories');

class EdgeService {
  private edgeRepository: EdgeRepository; 

  constructor() {
    this.edgeRepository = repository.edgeRepository;
  }

  async findByUserId(id: string): Promise<Edge[]> {
    return this.edgeRepository.find({ user: id });
  }

  async findByFlowId(id: string): Promise<Edge[]> {
    return this.edgeRepository.find({ flow: id });
  }

  async findBySourceId(id: string): Promise<Edge[]> {
    return this.edgeRepository.find({ source: id });
  }

  async deleteManyByFlowId(id: string): Promise<Edge[]> {
    return this.edgeRepository.deleteMany({ flow: id });
  }

  async insert(edge: Edge): Promise<Edge> {
    return this.edgeRepository.save(edge);
  }
}

module.exports = new EdgeService();
