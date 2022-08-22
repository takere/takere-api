import EdgeService = require('../services/edge.service');
import NodeService = require('../services/node.service');

class NodeProcessCore {
  async process(node: any) {
    await this.handleRecursiveTreeEdges(node.id);
  };
  
  async handleRecursiveTreeEdges(nodeId: any) {
    const edgeService = new EdgeService();
    const nodeService = new NodeService();
    const jobs = require("../jobs/handleJobs");
  
    const sourceNode = await nodeService.findById(nodeId);

    if (!sourceNode) {
      return;
    }

    const edges = await edgeService.findAllBySourceId(sourceNode.id ?? '');
    await jobs.handleJob(
      sourceNode.type,
      sourceNode.id,
      sourceNode.data,
      sourceNode.flow
    );
    for (let e of edges) {
      await this.handleRecursiveTreeEdges(e.target._id);
    }
  };
}

export = NodeProcessCore;
