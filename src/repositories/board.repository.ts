import Board from "../domain/board.domain";

export default interface BoardRepository {
  save(board: Board): Board;
  find(fields: object): Board[];
  findOne(fields: object): Board;
}
