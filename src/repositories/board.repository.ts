import Board from "../domain/board.domain";

export default interface BoardRepository {
  save(board: Board): Promise<Board>;
  find(fields: object): Promise<Board[]>;
  findOne(fields: object): Promise<Board>;
}
