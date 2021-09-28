const Board = require('../models/Board')
const Flow = require('../models/Flow')
const Executed = require('../models/Executed')

const handler = async (data, jobId, flowId) => {
    const flow = await Flow.findById(flowId);
    const executed = await Executed.create(
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
