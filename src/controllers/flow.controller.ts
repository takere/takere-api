import FlowService = require('../services/flow.service');

class FlowController {
  private readonly flowService: FlowService;
  
  constructor() {
    this.flowService = new FlowService();
    
  }

  public async getAll(req: any, res: any, next: any) {
    const user = await req.user;
    const flows = await this.flowService.findAllByUserId(user.id);

    res.send(flows);
  }
  
  public async get(req: any, res: any, next: any) {
    const user = await req.user;
    const flowId = await req.params.uid;
    const flow = await this.flowService.findByUserIdAndFlowId(user.id, flowId);

    res.send(flow);
  }

  public async remove(req: any, res: any, next: any) {
    const user = await req.user;
    const flowId = await req.params.uid;

    await this.flowService.removeWithUserIdAndFlowId(user.id, flowId);

    res.send('success');
  }

  public async create(req: any, res: any, next: any) {
    const { graph, name, description, patientEmail } = req.body
    const user = await req.user;

    await this.flowService.insert({
      author: user.id,
      name: name,
      patientEmail: patientEmail,
      description: description,
      nodes: graph.filter((d: { type: any; }) => d.type),
      edges: graph.filter((d: { source: any; }) => d.source)
    });

    res.send('Success');
  }
}

export = FlowController;
