import NodeService = require('../services/node.service');
import FlowService = require('../services/flow.service');
import EdgeService = require('../services/edge.service');

class TaskController {
  nodeService: NodeService;
  flowService: FlowService;
  edgeService: EdgeService;
  ag: any;

  constructor() {
    this.nodeService = new NodeService();
    this.flowService = new FlowService();
    this.edgeService = new EdgeService();
    this.ag = require('../helpers/jobQueue');
  }

  async getAll(req: any, res: any, next: any) {
    const user = await req.user;
    const flows = await this.flowService.findAllByUserId(user.id);

    res.send(flows);
  }
  async get(req: any, res: any, next: any) {
    const user = await req.user;
    const flowId = await req.params.uid;

    const flow = await this.flowService.findByUserIdAndFlowId(user.id, flowId);
    const nodes = await this.nodeService.findAllByFlowId(flowId);
    const edges = await this.edgeService.findAllByFlowId(flowId);

    res.send({
      flowId: flow.id,
      flowName: flow.name,
      flowDescription: flow.description,
      flowEmail: flow.userEmail,
      data: [
        ...nodes,
        ...edges
      ]
    });
  }

  async remove(req: any, res: any, next: any) {
    const user = await req.user;
    const flowId = await req.params.uid;

    const flow = await this.flowService.removeWithUserIdAndFlowId(user.id, flowId);
    await this.nodeService.removeAllWithFlowId(flow.id);
    await this.edgeService.removeAllWithFlowId(flow.id);


    res.send('success');
  }

  async create(req: any, res: any, next: any) {
    const { data, name, description, userEmail } = req.body
    const user = await req.user;

    // let timeTickers: any[] = [];
    let nodes = data.filter((d: { type: any; }) => d.type);
    let edges = data.filter((d: { source: any; }) => d.source);

    const storedFlow = await this.flowService.insert({
      user: user.id,
      name: name,
      userEmail: userEmail,
      description: description
    });

    for (let n of nodes) {
      await this.storeNode(n, storedFlow, edges/*, timeTickers*/);
    }
   
    for (let e of edges) {
      this.edgeService.insert({ source: e.source, target: e?.target, flow: storedFlow.id, animated: e.animated });
    }

    // for (let t of timeTickers) {
    //   this.storeTimeTicker(t);
    // }

    res.send('Success');
  }

  // private storeTimeTicker(t: any) {
  //   if (t.data.results === undefined) {
  //     t.data.results = {
  //       repeatInterval: "0",
  //       skipDays: "0"
  //     };
  //   }

    // const agendaData = t.data.results;
    // const job = this.ag.ag.create("TIME_TICKER", t);

    // job.repeatEvery(agendaData.repeatInterval, {
    //   endDate: new Date(agendaData.endDate),
    //   skipDays: agendaData.skipDays,
    //   skipImmediate: agendaData.skipImmediate,
    //   startDate: new Date(agendaData.startDate),
    // });
    // job.save();
  // }

  private async storeNode(n: any, flow: any, edges: any/*, timeTickers: any[]*/) {
    console.log('STORING', n.id);
    const storedNode = await this.nodeService.insert({ type: n.type, position: n?.position, data: n?.data, flow: flow.id, id: n.id });

    edges.map((e: { target: any; source: any; }) => {
      if (e?.target === n.id) {
        e.target = storedNode.id;
      }
      if (e.source === n.id) {
        e.source = storedNode.id;
      }
    });
    

    // if (storedNode.type === 'BEGIN_NODE') {
    //   timeTickers.push(storedNode);
    // }

    if (storedNode.data.results?.frequency) {
      const { type, value } = storedNode.data.results.frequency;
      
      const job = this.ag.ag.create("TIME_TICKER");
      const jobData = {
        endDate: beginNode.end, // beginNode of this node (remember: may have multiple begin nodes)
        startDate: beginNode.startDate,
      }

      if (type === 'onlyOnce') {
        job.now('today', jobData);
      }
      else {
        let repeatInterval = '';

        if (type === 'daily') {
          repeatInterval = '59 23 * * *';
        }
        else if (type === 'everyHours') {
          repeatInterval = `0 */${value} * * *`;
        }
        else if (type === 'everyDays') {
          repeatInterval = `0 23 */${value} * *`;
        }

        job.repeatEvery(repeatInterval, jobData);
      }
      
      job.save();
    }
  }
}

export = TaskController;
