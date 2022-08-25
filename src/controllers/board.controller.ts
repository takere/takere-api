import BoardService = require('../services/board.service');
import ExecutedService = require('../services/executed.service');

class BoardController {
  boardService: BoardService;
  executedService: ExecutedService;

  constructor() {
    this.boardService = new BoardService();
    this.executedService = new ExecutedService();
  }

  public async get(req: any, res: any, next: any) {
    const searchEmail = await req?.query?.email;
    const boards = await this.boardService.findAllByUserEmail(searchEmail);

    res.send(boards);
  }

  public async resolve(req: any, res: any, next: any) {
    const {boardId, result} = req.body

    let updatedBoard = await this.boardService.resolve(boardId, result);
    
    res.send(updatedBoard);
  }
}

export = BoardController;
