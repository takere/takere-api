const Board = require('../models/Board');
const flowService = require('../services/flow.service');

const handler = async (data, jobId, flowId) => {
    const flow = await flowService.findByFlowId(flowId);

    //name, description, userEmail, flow, node
    const board = await Board.createBoard(
        data.results.boardName,
        data.results.boardDescription,
        flow.userEmail,
        flow._id,
        jobId
    );
}

module.exports = {
    handler
}
