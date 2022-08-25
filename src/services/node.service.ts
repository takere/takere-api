import Service = require('./service');
import JobService = require('../services/job.service');
import Node = require('../domain/node.domain');
import Job = require("../models/job.model");
import Cron = require("../models/cron.model");
import Edge = require('../domain/edge.domain');
import NodeRepository = require('../repositories/node.repository');

class NodeService extends Service {
  private nodeRepository: NodeRepository; 
  private readonly jobService: JobService;

  constructor() {
    super();
    this.nodeRepository = this.repository.nodeRepository;
    this.jobService = new JobService();
  }

  getNodes(): Node[] {
    return require('./nodes');
  }

  public async find(fields: object): Promise<Node[]> {
    return this.nodeRepository.find(fields);
  }

  public async findById(id: string): Promise<Node> {
    return this.nodeRepository.findOne({ _id: id });
  }

  public async findAllByFlowId(flowId: string): Promise<Node[]> {
    return this.nodeRepository.find({ flow: flowId });
  }

  public async insert(node: Node): Promise<Node> {
    return this.nodeRepository.save(node);
  }

  public async removeAllWithFlowId(flowId: string): Promise<Node[]> {
    return this.nodeRepository.deleteMany({ flow: flowId });
  }

  public createJobForNode(storedNode: Node, nodes: Node[], edges: Edge[]) {
    const { type, value } = storedNode.data.results.frequency;
    const beginNode: Node = this.findRoot(storedNode, nodes, edges);

    // TODO: Validate if received nodes contains all required fields

    const job: Job = {
      beginDate: beginNode.data.results.startDate,
      endDate: beginNode.data.results.endDate,
      data: storedNode
    };

    if (type === 'onlyOnce') {
      this.jobService.createOnlyOnceEvent(job);
    }
    else {
      const repeatInterval: Cron = {
        seconds: (type === 'daily') ? '59' : '0',
        minute: (type === 'daily') ? '23' : `*/${value}`,
        hour: (type === 'everyDays') ? `*/${value}` : undefined,
        dayOfMonth: undefined,
        month: undefined,
        dayOfWeek: undefined
      };
      this.jobService.createRepeatedEvent(job, repeatInterval);
    }
  }
  
  private findRoot(node: Node, nodes: Node[], edges: Edge[]): Node {
    const parent = this.findParent(node, nodes, edges);

    if (parent === node) {
      return parent;
    }

    return this.findRoot(parent, nodes, edges);
  }

  private findParent(node: Node, nodes: Node[], edges: Edge[]): Node {
    const parentId = edges.find(edge => edge.target === node.id)?.source ?? node.id;

    return nodes.find(n => n.id === parentId) ?? node;
  }
}

export = NodeService;
