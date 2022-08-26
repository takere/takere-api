import Service = require('./service');
import ExecutedService = require('./executed.service');
import Board = require('../domain/board.domain');
import BoardDTO = require('../dto/board.dto');
import BoardRepository = require('../repositories/board.repository');
import UserBoardDTO = require('../dto/user-board.dto');

class BoardService extends Service {
  private boardRepository: BoardRepository; 
  private executedService: ExecutedService; 

  constructor() {
    super();
    this.boardRepository = this.repository.boardRepository;
    this.executedService = new ExecutedService();
  }

  public async findAllByUserEmail(email: string): Promise<UserBoardDTO[]> {
    const boards = await this.boardRepository.findByUserEmail(email);
    console.log(boards)
    const formattedBoards = [];

    for(const board of boards) {
      formattedBoards.push(this.formatBoard(board));
    }

    return formattedBoards;
  }
  
  private formatBoard(board: Board): UserBoardDTO {
    console.log(board)
    return {
      id: board.id,
      name: board.name,
      description: board.description,
      type: board.node.data.type,
      icon: board.node.data.icon,
      content: board.content,
      executed: {
          id: board?.executed?.id,
          executedAt: board?.executed?.createdAt,
          result: board?.executed?.result
      },
      node: {
        id: board.node.id,
        results: this.objectWithoutProperties(board?.node?.data?.results, ["name", "description"]),
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

  public async findAllByUserId(id: string): Promise<Board[]> {
    return this.boardRepository.find({ user: id });
  }

  public async resolve(boardId: string, result: any): Promise<Board> {
    let board = await this.findById(boardId);

    if(!board.executed) {
       const executed = await this.executedService.insert({
          result,
          node: board.id
       });
      
       board.executed = executed.id;
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
