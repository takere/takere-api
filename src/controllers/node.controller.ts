/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import NodeService from '../services/node.service';


class NodeController {

  // --------------------------------------------------------------------------
  //         Attributes
  // --------------------------------------------------------------------------
  private readonly nodeService: NodeService;


  // --------------------------------------------------------------------------
  //         Constructor
  // --------------------------------------------------------------------------
  constructor() {
    this.nodeService = new NodeService();
  }


  // --------------------------------------------------------------------------
  //         Methods
  // --------------------------------------------------------------------------
  public async get(req: any, res: any, next: any) {
    res.send(this.nodeService.getNodes());
  }

  public getAllConnections(req: any, res: any, next: any) {
    res.send(this.nodeService.getAllConnections());
  }
}

export default NodeController;
