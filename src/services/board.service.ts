import Service = require('./service');
import Board = require('../domain/board.domain');
import BoardDTO = require('../dto/board.dto');
import BoardRepository = require('../repositories/board.repository');

class BoardService extends Service {
  private boardRepository: BoardRepository; 

  constructor() {
    super();
    this.boardRepository = this.repository.boardRepository;
  }

  async findAllByUserEmail(email: string): Promise<Board[]> {
    return this.boardRepository.findByUserEmail(email);
  }

  async findAllByUserId(id: string): Promise<Board[]> {
    return this.boardRepository.find({ user: id });
  }

  async findById(id: string): Promise<Board> {
    return this.boardRepository.findOne({ _id: id });
  }

  async insert(board: BoardDTO): Promise<Board> {
    return this.boardRepository.save(board);
  }

  async update(board: Board): Promise<Board> {
    return this.boardRepository.save(board);
  }
}

export = BoardService;
