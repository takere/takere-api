import BoardDTO = require('../dto/board.dto');

class Reminder {
    boardService: any;
    flowService: any;
    executedService: any;
  
    constructor() {
      this.boardService = require('../services/board.service');
      this.flowService = require('../services/flow.service');
      this.executedService = require('../services/executed.service');
    }
  
    public async handler(data: any, jobId: string, flowId: string) {
        const flow = await this.flowService.findByFlowId(flowId);
        const executed = await this.executedService.insert(
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
        this.boardService.insert(board);
    }
  }
  
  const reminder = new Reminder();
  
  module.exports = {
    handler: reminder.handler
  }

  