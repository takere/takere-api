import Board = require('../domain/board.domain');
import BoardDTO = require('../dto/board.dto');

interface BoardRepository {
  save(board: BoardDTO): Promise<Board>;
  update(board: Board): Promise<Board>;
  find(fields: object): Promise<Board[]>;
  findOne(fields: object): Promise<Board>;
  findByEmail(email: string): Promise<Board[]>;
}

export = BoardRepository;
