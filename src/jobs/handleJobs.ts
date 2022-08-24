// const externalLink = require('./externalLink');
// const dataInput = require('./dataInput');
// const motivational = require('./motivacional');
import Reminder = require("./reminder");
import BoardService = require('../services/board.service');
import FlowService = require('../services/flow.service');
import BoardDTO = require('../dto/board.dto');

const JOB_TYPES = {
    DATA_INPUT: "DATA_INPUT",
    EXTERNAL_LINK: "EXTERNAL_LINK",
    MOTIVATIONAL: "MOTIVATIONAL",
    REMINDER: "REMINDER_NODE"
}

const handleJob = async (jobName: string, jobId: string, data: any, flowId: string) => {
    const boardService = new BoardService();
    const flowService = new FlowService();
    const flow = await flowService.findById(flowId);
    const board: BoardDTO = {
        name: data.results.name,
        description: data.results.description,
        userEmail: flow.userEmail,
        flow: flow.id,
        node: jobId,
        executed: undefined,
        content: data.results
        // completed: false
    }
    boardService.insert(board);
}


module.exports = {
    JOB_TYPES,
    handleJob
}
