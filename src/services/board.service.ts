import Service = require('./service');
import FinishedService = require('./finished.service');
import Board = require('../domain/board.domain');
import BoardDTO = require('../dto/board.dto');
import BoardRepository = require('../repositories/board.repository');
import UserBoardDTO = require('../dto/user-board.dto');

class BoardService extends Service {
  private boardRepository: BoardRepository; 
  private finishedService: FinishedService; 

  constructor() {
    super();
    this.boardRepository = this.repository.boardRepository;
    this.finishedService = new FinishedService();
  }

  public async findAllByEmail(email: string): Promise<UserBoardDTO[]> {
    const boards = await this.boardRepository.findByEmail(email);
    
    const formattedBoards = [];

    for(const board of boards) {
      formattedBoards.push(this.formatBoard(board));
    }

    formattedBoards.sort((board1, board2) => {
      if (!board1.node.arguments) {
        return -1;
      }

      if (!board2.node.arguments) {
        return 1;
      }

      const board1SeverityIdx = board1.node.parameters.findIndex(parameter => parameter.slug === 'severity');
      const board2SeverityIdx = board2.node.parameters.findIndex(parameter => parameter.slug === 'severity');

      return board2.node.arguments[board1SeverityIdx].value - board1.node.arguments[board2SeverityIdx].value;
    });

    return formattedBoards;
  }
  
  private formatBoard(board: Board): UserBoardDTO {
    return {
      id: board.id,
      name: board.name,
      description: board.description,
      node: board.node,
      finished: {
        id: board?.finished?.id,
        at: board?.finished?.createdAt,
        result: board?.finished?.result
      },
    }
  }

  public async resolve(boardId: string, result: { payload: any }): Promise<Board> {
    let board = await this.findById(boardId);

    if(!board.finished) {
       const finished = await this.finishedService.insert({
          result: result.payload,
          node: board.id
       });
      
       board.finished = finished.id;
    }

    this.update(board);

    return board;
  }

  public async findById(id: string): Promise<Board> {
    return this.boardRepository.findOne({ _id: id });
  }

  public async insert(board: BoardDTO): Promise<Board> {
    return this.boardRepository.save(board);
  }

  public async update(board: Board): Promise<Board> {
    return this.boardRepository.update(board);
  }

  public async removeAllWithFlowId(id: string): Promise<Board[]> {
    return this.boardRepository.removeAllWithFlowId(id);
  }
}

export = BoardService;
