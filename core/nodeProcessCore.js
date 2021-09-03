const Edge = require('../models/Edge');
const Node = require('../models/Node');
const jobs = require('../jobs/handleJobs');
const mongoose = require('mongoose');


const process = async (node) => {
    await handleRecursiveTreeEdges(node._id)
}

const handleRecursiveTreeEdges = async (nodeId) => {
    const sourceNode = await Node.findOne({_id: nodeId });
    const edges = await Edge.find({ source: sourceNode._id });
    jobs.handleJob(sourceNode.type, sourceNode.data);
    for(e of edges){
        await handleRecursiveTreeEdges(e.target._id);
    }
}

module.exports = {
    process
}
