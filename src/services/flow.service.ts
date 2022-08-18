
import Flow from "../domain/flow.domain";
import FlowRepository from "../repositories/flow.repository";

const repository = require('../repositories');

class FlowService {
  private flowRepository: FlowRepository; 

  constructor() {
    this.flowRepository = repository.flowRepository;
  }

  async findByUserId(id: string): Promise<Flow[]> {
    return this.flowRepository.find({ user: id });
  }

  async findById(id: string): Promise<Flow> {
    return this.flowRepository.findOne({ _id: id });
  }

  async removeWithUserIdAndFlowId(userId: string, flowId: string): Promise<Flow> {
    return this.flowRepository.findOneAndRemove({user: userId, _id: flowId});
  }

  async insert(flow: Flow): Promise<Flow> {
    return this.flowRepository.save(flow);
  }
}

module.exports = new FlowService();
