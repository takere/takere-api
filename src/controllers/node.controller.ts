import NodeService = require('../services/node.service');

class NodeController {
  nodeService: any;

  constructor() {
    this.nodeService = new NodeService();
  }

  public async get(req: any, res: any, next: any) {
    res.send(this.nodeService.getNodes());
  }

  public getAllConnections(req: any, res: any, next: any) {
    res.send(this.nodeService.getAllConnections());
  }
}

export = NodeController;
