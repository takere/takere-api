import Board = require('../domain/board.domain');

interface BoardRepository {
  save(board: Board): Promise<Board>;
  find(fields: object): Promise<Board[]>;
  findOne(fields: object): Promise<Board>;
  findByUserEmail(email: string): Promise<Board[]>;
}

export = BoardRepository;
