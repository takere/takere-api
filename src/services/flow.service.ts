import Service = require('./service');
import Flow = require('../domain/flow.domain');
import FlowRepository = require('../repositories/flow.repository');

class FlowService extends Service {
  private flowRepository: FlowRepository; 

  constructor() {
    super();
    this.flowRepository = this.repository.flowRepository;
  }

  async findAllByUserIdAndFlowId(userId: string, flowId: string): Promise<Flow[]> {
    return this.flowRepository.find({ user: userId, _id: flowId });
  }

  async findAllByUserId(id: string): Promise<Flow[]> {
    return this.flowRepository.find({ user: id });
  }

  async findById(id: string): Promise<Flow> {
    return this.flowRepository.findOne({ _id: id });
  }

  async removeWithUserIdAndFlowId(userId: string, flowId: string): Promise<Flow> {
    return this.flowRepository.findOneAndRemove({user: userId, _id: flowId});
  }

  async insert(flow: Flow): Promise<Flow> {
    return this.flowRepository.save({ ...flow, id: undefined });
  }
}

export = FlowService;
