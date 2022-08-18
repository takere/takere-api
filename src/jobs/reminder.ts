import BoardDTO from "../dto/board.dto";

const boardService = require('../services/board.service');
const executedService = require('../services/executed.service');
const flowService = require('../services/flow.service');

const handler = async (data: any, jobId: string, flowId: string) => {
    const flow = await flowService.findByFlowId(flowId);
    const executed = await executedService.insert(
        data.results.reminder_phrase,
        jobId
    );

    //name, description, userEmail, flow, node
    const board: BoardDTO = {
        name: data.results.boardName,
        description: data.results.boardDescription,
        userEmail: flow.userEmail,
        flow: flow._id,
        node: jobId,
        executed: executed._id
    }
    boardService.insert(board);
}

module.exports = {
    handler
}
