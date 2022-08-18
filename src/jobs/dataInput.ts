import BoardDTO from "../dto/board.dto";

const boardService = require('../services/board.service');
const flowService = require('../services/flow.service');

const handler = async (data: any, jobId: string, flowId: string) => {
    const flow = await flowService.findByFlowId(flowId);

    //name, description, userEmail, flow, node
    const board: BoardDTO = {
        name: data.results.boardName,
        description: data.results.boardDescription,
        userEmail: flow.userEmail,
        flow: flow._id,
        node: jobId,
        executed: undefined
    }
    await boardService.insert(board);
}

module.exports = {
    handler
}
