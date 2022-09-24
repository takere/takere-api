import BoardService = require('../services/board.service');
import FinishedService = require('../services/finished.service');

class BoardController {
  boardService: BoardService;
  finishedService: FinishedService;

  constructor() {
    this.boardService = new BoardService();
    this.finishedService = new FinishedService();
  }

  public async get(req: any, res: any, next: any) {
    const searchEmail = await req?.query?.email;
    const boards = await this.boardService.findAllByEmail(searchEmail);

    res.send(boards);
  }

  public async resolve(req: any, res: any, next: any) {
    const {boardId, result} = req.body

    let updatedBoard = await this.boardService.resolve(boardId, result);
    
    res.send(updatedBoard);
  }
}

export = BoardController;
