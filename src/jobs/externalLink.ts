// class ExternalLink {
//     boardService: any;
//     flowService: any;
//     executedService: any;
  
//     constructor() {
//       this.boardService = require('../services/board.service');
//       this.flowService = require('../services/flow.service');
//       this.executedService = require('../services/executed.service');
//     }
  
//     public async handler(data: any, jobId: string, flowId: string) {
//         const flow = await flowService.findByFlowId(flowId);
//         const executed = await executedService.insert(
//             data.results.link,
//             jobId
//         );
    
//         //name, description, userEmail, flow, node
//         const board: BoardDTO = {
//             name: data.results.boardName,
//             description: data.results.boardDescription,
//             userEmail: flow.userEmail,
//             flow: flow._id,
//             node: jobId,
//             executed
//         }
//         await boardService.insert(board);
//     }
//   }
  
//   const link = new ExternalLink();
  
//   module.exports = {
//     handler: link.handler
//   }
  