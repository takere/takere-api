import Board = require('../domain/board.domain');
import BoardDTO = require('../dto/board.dto');

interface BoardRepository {
  findAllByFlowAndPatient(flowId: string, patientEmail: string): Promise<Board[]>;
  findAllByAuthor(userId: string): Promise<Board[]>;
  findAll(email: string): Promise<Board[]>;
  findAllFinishedByEmail(email: string): Promise<Board[]>;
  findBoard(nodeId: string, flowId: string): Promise<Board>;
  save(board: BoardDTO): Promise<Board>;
  update(board: Board): Promise<Board>;
  find(fields: object): Promise<Board[]>;
  findOne(fields: object): Promise<Board>;
  findAllUnfinishedByEmail(email: string): Promise<Board[]>;
  removeAllWithFlowId(id: any): Promise<Board[]>;
}

export = BoardRepository;
