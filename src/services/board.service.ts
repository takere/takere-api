
import Board from "../domain/board.domain";
import BoardDTO from "../dto/board.dto";
import BoardRepository from "../repositories/board.repository";

const repository = require('../repositories');

class BoardService {
  private boardRepository: BoardRepository; 

  constructor() {
    this.boardRepository = repository.flowRepository;
  }

  async findByUserEmail(email: string): Promise<Board[]> {
    return this.boardRepository.findByUserEmail(email);
  }

  async findByUserId(id: string): Promise<Board[]> {
    return this.boardRepository.find({ user: id });
  }

  async findById(id: string): Promise<Board> {
    return this.boardRepository.findOne({ _id: id });
  }

  async insert(board: BoardDTO): Promise<Board> {
    return this.boardRepository.save({ ...board, id: undefined, completed: false });
  }

  async update(board: Board): Promise<Board> {
    return this.boardRepository.save(board);
  }
}

module.exports = new BoardService();
