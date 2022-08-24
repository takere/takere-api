import NodeService = require('../services/node.service');
import FlowService = require('../services/flow.service');
import EdgeService = require('../services/edge.service');
import JobService = require('../services/job.service');
import Job = require("../models/job.model");
import Cron = require("../models/cron.model");
import Node = require("../domain/node.domain");
import Edge = require("../domain/edge.domain");

class TaskController {
  private readonly nodeService: NodeService;
  private readonly flowService: FlowService;
  private readonly edgeService: EdgeService;
  private readonly jobService: JobService;

  constructor() {
    this.nodeService = new NodeService();
    this.flowService = new FlowService();
    this.edgeService = new EdgeService();
    this.jobService = new JobService();
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

  public async remove(req: any, res: any, next: any) {
    const user = await req.user;
    const flowId = await req.params.uid;

    const flow = await this.flowService.removeWithUserIdAndFlowId(user.id, flowId);
    await this.nodeService.removeAllWithFlowId(flow.id);
    await this.edgeService.removeAllWithFlowId(flow.id);


    res.send('success');
  }

  public async create(req: any, res: any, next: any) {
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
      await this.storeNode(n, storedFlow, nodes, edges/*, timeTickers*/);
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

  private async storeNode(n: Node, flow: any, nodes: Node[], edges: Edge[]) {
    console.log('STORING', n.id);
    const storedNode = await this.nodeService.insert({ type: n.type, position: n?.position, data: n?.data, flow: flow.id, id: n.id });

    // Updates node id on each edge
    

    if (storedNode.data.results?.frequency) {
      this.createJobForNode(storedNode, nodes, edges);
    }

    edges.map((e: { target: any; source: any; }) => {
      if (e?.target === n.id) {
        e.target = storedNode.id;
      }
      if (e.source === n.id) {
        e.source = storedNode.id;
      }
    });
  }

  private createJobForNode(storedNode: Node, nodes: Node[], edges: Edge[]) {
    const { type, value } = storedNode.data.results.frequency;
    console.log('finding root...')
    console.log(nodes)
    console.log(edges)
    const beginNode: Node = this.findRoot(storedNode, nodes, edges);
    console.log(storedNode, beginNode)
    // problem: findRoot not working
    console.log('----')
    // const job: Job = {
    //   beginDate: beginNode.data.results.startDate,
    //   endDate: beginNode.data.results.endDate,
    //   data: storedNode
    // };

    // if (type === 'onlyOnce') {
    //   this.jobService.createOnlyOnceEvent(job);
    // }
    // else {
    //   const repeatInterval: Cron = {
    //     seconds: (type === 'daily') ? '59' : '0',
    //     minute: (type === 'daily') ? '23' : `*/${value}`,
    //     hour: (type === 'everyDays') ? `*/${value}` : undefined,
    //     dayOfMonth: undefined,
    //     month: undefined,
    //     dayOfWeek: undefined
    //   };
    //   this.jobService.createRepeatedEvent(job, repeatInterval);
    // }
  }
  
  private findRoot(node: Node, nodes: Node[], edges: Edge[]): Node {
    const parent = this.findParent(node, nodes, edges);

    if (parent === node) {
      return parent;
    }

    return this.findRoot(parent, nodes, edges);
  }

  private findParent(node: Node, nodes: Node[], edges: Edge[]): Node {
    const parentId = edges.find(edge => edge.target === node.id)?.id ?? node.id;

    return nodes.find(n => n.id === parentId) ?? node;
  }
}

export = TaskController;
