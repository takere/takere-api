import Service = require('./service');
import Flow = require('../domain/flow.domain');
import FlowDTO = require('../dto/flow.dto');
import FlowRepository = require('../repositories/flow.repository');

class FlowService extends Service {
  private flowRepository: FlowRepository; 

  constructor() {
    super();
    this.flowRepository = this.repository.flowRepository;
  }

  async findByUserIdAndFlowId(userId: string, flowId: string): Promise<Flow> {
    return this.flowRepository.findOne({ user: userId, _id: flowId });
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

  async insert(flow: FlowDTO): Promise<Flow> {
    return this.flowRepository.save(flow);
  }
}

export = FlowService;
