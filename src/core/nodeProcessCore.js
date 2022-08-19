const edgeService = require('../services/edge.service');
const nodeService = require('../services/node.service');
const jobs = require('../jobs/handleJobs');


const process = async (node) => {
    await handleRecursiveTreeEdges(node._id)
}

const handleRecursiveTreeEdges = async (nodeId) => {
    const sourceNode = await nodeService.findById(nodeId);
    const edges = await edgeService.findAllBySourceId(sourceNode._id);
    await jobs.handleJob(sourceNode.data.type, sourceNode._id, sourceNode.data, sourceNode.flow);
    for(e of edges){
        await handleRecursiveTreeEdges(e.target._id);
    }
}

module.exports = {
    process
}
