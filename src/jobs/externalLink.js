const Board = require('../models/Board');
const executedService = require('../services/executed.service');
const flowService = require('../services/flow.service');

const handler = async (data, jobId, flowId) => {
    const flow = await flowService.findByFlowId(flowId);
    const executed = await executedService.insert(
        data.results.link,
        jobId
    );

    //name, description, userEmail, flow, node
    const board = await Board.createBoard(
        data.results.boardName,
        data.results.boardDescription,
        flow.userEmail,
        flow._id,
        jobId,
        executed
    );
}

module.exports = {
    handler
}
