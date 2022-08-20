import BoardService = require('../services/board.service');
import ExecutedService = require('../services/executed.service');

class BoardController {
  boardService: any;
  executedService: any;

  constructor() {
    this.boardService = new BoardService();
    this.executedService = new ExecutedService();
  }

  public async get(req: any, res: any, next: any) {
    const searchEmail = await req?.query?.email;
    const boards = await this.boardService.findAllByUserEmail(searchEmail);
    const data = [];

    for(const b of boards) {
       const result = this.handleDataNodes(b)
        data.push(result)
    }


    res.send(data);
  }

  private handleDataNodes(board: any) {
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
            results: this.objectWithoutProperties(board?.node?.data?.results, ["boardName", "boardDescription"]),
        }
    }
  }
  
  private objectWithoutProperties(obj: any, keys: any) {
    let target: any = {};
    for (const i in obj) {
        if (keys.indexOf(i) >= 0) continue;
        if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
        target[i] = obj[i];
    }
    return target;
  }

  public async resolve(req: any, res: any, next: any) {
    const {boardId, result} = req.body

    let board = await this.boardService.findById(boardId);
    board.completed = true;

    if(!board.executed) {
       const executed = await this.executedService.insert(
            result,
            board.id
       );
        board.executed = executed.id;
    }

    this.boardService.update(board);

    res.send(board);
  }
}

export = BoardController;
