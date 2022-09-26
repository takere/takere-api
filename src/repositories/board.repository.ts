import Board = require('../domain/board.domain');
import BoardDTO = require('../dto/board.dto');

interface BoardRepository {
  save(board: BoardDTO): Promise<Board>;
  update(board: Board): Promise<Board>;
  find(fields: object): Promise<Board[]>;
  findOne(fields: object): Promise<Board>;
  findAllUnfinishedByEmail(email: string): Promise<Board[]>;
  removeAllWithFlowId(id: any): Promise<Board[]>;
}

export = BoardRepository;
