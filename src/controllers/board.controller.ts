import BoardService from '../services/board.service';
import FinishedService from '../services/finished.service';

class BoardController {
  boardService: BoardService;
  finishedService: FinishedService;

  constructor() {
    this.boardService = new BoardService();
    this.finishedService = new FinishedService();
  }

  public async get(req: any, res: any, next: any) {
    const searchEmail = await req?.query?.email;
    const boards = await this.boardService.findAllUnfinishedByEmail(searchEmail);

    res.send(boards);
  }

  public async resolve(req: any, res: any, next: any) {
    const {boardId, answers} = req.body

    let updatedBoard = await this.boardService.resolve(boardId, answers);
    
    res.send(updatedBoard);
  }
}

export default BoardController;
