/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Service from './service';
import Node from '../domain/node.domain';
import NodeRepository from '../repositories/node.repository';
import FinishedService from './finished.service';
import NodeConnection from '../models/node-connection.model';
import connections from '../assets/nodes/connections.json';
import nodes from '../assets/nodes';
import NodeDTO from '../dto/node.dto';


/**
 * Responsible for providing node services.
 */
class NodeService extends Service {

  // --------------------------------------------------------------------------
  //         Attributes
  // --------------------------------------------------------------------------
  private nodeRepository: NodeRepository; 
  private finishedService: FinishedService; 


  // --------------------------------------------------------------------------
  //         Constructor
  // --------------------------------------------------------------------------
  constructor() {
    super();
    this.nodeRepository = this.repository.nodeRepository;
    this.finishedService = new FinishedService();
  }


  // --------------------------------------------------------------------------
  //         Methods
  // --------------------------------------------------------------------------
  getNodes(): NodeDTO[] {
    return nodes;
  }

  public getAllConnections(): NodeConnection[] {
    
    return connections;
  }

  public async findById(id: string): Promise<Node> {
    return this.nodeRepository.findById(id);
  }

  public async findAllByFlowId(flowId: string): Promise<Node[]> {
    return this.nodeRepository.findAllByFlowId(flowId);
  }

  public async insert(node: Node): Promise<Node> {
    return this.nodeRepository.insert(node);
  }

  public async removeAllWithFlowId(flowId: string): Promise<Node[]> {
    const removedNodes = await this.nodeRepository.removeAllWithFlowID(flowId);

    removedNodes.forEach(node => {
      if (node.id) {
        this.finishedService.removeAllWithNodeId(node.id);
      }
    });

    return removedNodes;
  }
}

export default NodeService;
