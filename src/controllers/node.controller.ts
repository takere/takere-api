import NodeService = require('../services/node.service');

class NodeController {
  nodeService: any;

  constructor() {
    this.nodeService = new NodeService();
  }

  async get(req: any, res: any, next: any) {
    res.send(this.nodeService.getNodes());
  }
}

export = NodeController;
