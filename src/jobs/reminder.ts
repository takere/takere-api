import BoardDTO = require('../dto/board.dto');
import BoardService = require('../services/board.service');
import FlowService = require('../services/flow.service');
import ExecutedService = require('../services/executed.service');

class Reminder {
  boardService: BoardService;
  flowService: FlowService;
  executedService: ExecutedService;

  constructor() {
    this.boardService = new BoardService();
    this.flowService = new FlowService();
    this.executedService = new ExecutedService();
  }

  public async handler(data: any, jobId: string, flowId: string) {
      const flow = await this.flowService.findById(flowId);
      const executed = await this.executedService.insert({
          result: data.results.reminder_phrase,
          node: jobId
      }
      );
  
      //name, description, userEmail, flow, node

      const board: BoardDTO = {
          name: data.results.name,
          description: data.results.description,
          userEmail: flow.userEmail,
          flow: flow.id,
          node: jobId,
          executed: executed.id,
          completed: false
      }
      this.boardService.insert(board);
  }
}

export = Reminder;
  