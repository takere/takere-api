// class DataInput {
//   boardService: any;
//   flowService: any;

//   constructor() {
//     this.boardService = require('../services/board.service');
//     this.flowService = require('../services/flow.service');
//   }

//   public async handler(data: any, jobId: string, flowId: string) {
//     const flow = await flowService.findByFlowId(flowId);
  
//     //name, description, userEmail, flow, node
//     const board: BoardDTO = {
//       name: data.results.boardName,
//       description: data.results.boardDescription,
//       userEmail: flow.userEmail,
//       flow: flow.id,
//       node: jobId,
//       executed: undefined
//     }
//     await boardService.insert(board);
//   }
// }

// const dataInput = new DataInput();

// module.exports = {
//   handler: dataInput.handler
// }
