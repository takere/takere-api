/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Service from './service';
import NodeService from './node.service';
import EdgeService from './edge.service';
import Flow from '../domain/flow.domain';
import Node from '../domain/node.domain';
import Edge from '../domain/edge.domain';
import FlowDTO from '../dto/flow.dto';
import UserFlowDTO from '../dto/user-flow.dto';
import FlowRepository from '../repositories/flow.repository';
import BoardService from './board.service';


/**
 * Responsible for providing flow services.
 */
class FlowService extends Service {

  // --------------------------------------------------------------------------
  //         Attributes
  // --------------------------------------------------------------------------
  private readonly flowRepository: FlowRepository;
  private readonly edgeService: EdgeService;
  private readonly nodeService: NodeService;
  private readonly boardService: BoardService;


  // --------------------------------------------------------------------------
  //         Constructor
  // --------------------------------------------------------------------------
  constructor() {
    super();
    this.flowRepository = this.repository.flowRepository;
    this.nodeService = new NodeService();
    this.edgeService = new EdgeService();
    this.boardService = new BoardService();
  }


  // --------------------------------------------------------------------------
  //         Methods
  // --------------------------------------------------------------------------
  public async findByUserIdAndFlowId(userId: string, flowId: string): Promise<UserFlowDTO> {
    const flow = await this.flowRepository.findByAuthorAndFlow(userId, flowId);
    const nodes = await this.nodeService.findAllByFlowId(flowId);
    const edges = await this.edgeService.findAllByFlowId(flowId);
    
    return {
      id: flow.id,
      name: flow.name,
      description: flow.description,
      email: flow.patientEmail,
      graph: [
        ...nodes,
        ...edges
      ]
    };
  }

  public async findAllByUserId(id: string): Promise<Flow[]> {
    return this.flowRepository.findAllByAuthor(id);
  }

  public async findById(id: string): Promise<Flow> {
    return this.flowRepository.findById(id);
  }

  public async removeWithUserIdAndFlowId(userId: string, flowId: string): Promise<Flow> {
    const flow = await this.flowRepository.removeByAuthorAndFlow(userId, flowId);

    await this.nodeService.removeAllWithFlowId(flowId);
    await this.edgeService.removeAllWithFlowId(flowId);
    await this.boardService.removeAllWithFlowId(flowId);

    return flow;
  }

  public async insert(flow: FlowDTO): Promise<Flow> {
    const storedFlow: Flow = await this.flowRepository.save(flow);
    const storedNodes: Node[] = await this.storeNodes(flow.nodes, flow.edges, storedFlow);
    const storedEdges: Edge[] = await this.storeEdges(flow.edges, storedFlow);

    for (let n of this.findAllChildrenOfRoot(storedNodes, storedEdges)) {
      await this.boardService.insertNodeOnTheBoard(n, storedFlow, storedNodes, storedEdges);
    }

    return storedFlow;
  }

  private async storeNodes(nodes: any, edges: any, storedFlow: any) {
    const storedNodes = [];

    for (let n of nodes) {
      let storedNode = await this.storeNode(n, storedFlow, nodes, edges);

      storedNodes.push(storedNode);
    }

    return storedNodes;
  }

  private async storeNode(n: any, flow: any, nodes: Node[], edges: Edge[]) {
    let data = { ...n?.data, position: n?.position, flow: flow.id }

    const storedNode = await this.nodeService.insert(data);

    edges.forEach((e: { target: any; source: any; }) => {
      if (e?.target === n.id) {
        e.target = storedNode.id;
      }
      if (e.source === n.id) {
        e.source = storedNode.id;
      }
    });

    return storedNode;
  }

  private async storeEdges(edges: any, storedFlow: any) {
    const storedEdges = [];

    for (let edge of edges) {
      let storedEdge = await this.edgeService.insert({ 
        source: edge.source, 
        target: edge?.target, 
        flow: storedFlow.id, 
        animated: edge.animated 
      });

      storedEdges.push(storedEdge);
    }

    return storedEdges;
  }

  private findAllChildrenOfRoot(nodes: Node[], edges: Edge[]): Node[] {
    const root = nodes.find(node => node.type === 'BEGIN');
    const childrenIds = edges
      .filter(edge => edge.source === root?.id)
      .map(edge => edge.target);

    return nodes.filter(node => childrenIds.includes(node.id ?? ''));
  }
}

export default FlowService;
