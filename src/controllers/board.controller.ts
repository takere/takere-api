const boardService = require('../../../services/board.service');
const executedService = require('../../../services/executed.service');
const job =  require('../../jobs/handleJobs');

const handleDataNodes = (board: any) => {
  return {
      type: board.node.data.type,
      completed: board.completed,
      id: board.id,
      name: board.name,
      description: board.description,
      icon: board.icon,
      executed: {
          id: board?.executed?.id,
          executedAt: board?.executed?.createdAt,
          result: board?.executed?.result
      },
      node: {
          id: board.node.id,
          results: _objectWithoutProperties(board?.node?.data?.results, ["boardName", "boardDescription"]),
      }
  }
}

function _objectWithoutProperties(obj: any, keys: any) {
  let target: any = {};
  for (const i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
  }
  return target;
}

module.exports = {
  get: async (req: any, res: any, next: any) => {
    const searchEmail = await req?.query?.email;
    const boards = await boardService.findAllByUserEmail(searchEmail);
    const data = [];

    for(const b of boards) {
       const result = handleDataNodes(b)
        data.push(result)
    }


    res.send(data);
  },
  resolve: async (req: any, res: any, next: any) => {
    const {boardId, result} = req.body

    let board = await boardService.findById(boardId);
    board.completed = true;

    if(!board.executed) {
       const executed = await executedService.insert(
            result,
            board.id
       );
        board.executed = executed.id;
    }

    boardService.update(board);

    res.send(board);
  }
};
