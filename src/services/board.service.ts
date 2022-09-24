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
      console.log(this.formatBoard(board))
    }

    return formattedBoards;
  }
  
  private formatBoard(board: Board): UserBoardDTO {
    return {
      id: board.id,
      name: board.name,
      description: board.description,
      node: {
        id: board.node.id,
        type: board.node.type,
        icon: board.node.data.icon,
        bgColor: board.node.data.bgColor,
        results: board?.node?.data?.results
        //results: this.objectWithoutProperties(board?.node?.data?.results, ["name", "description"]),
      },
      finished: {
        id: board?.finished?.id,
        at: board?.finished?.createdAt,
        result: board?.finished?.result
      },
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

  public async findAllByUserId(id: string): Promise<Board[]> {
    return this.boardRepository.find({ user: id });
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
}

export = BoardService;
