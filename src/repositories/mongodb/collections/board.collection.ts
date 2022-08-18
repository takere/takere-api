import BoardRepository from "../../board.repository";
import Board from "../../../domain/board.domain";

class BoardCollection implements BoardRepository {
  private _schema: any;

  constructor() {
    this._schema = require('../schemas/board.schema');
  }

  public async findOne(fields: object): Promise<Board> {
    const storedBoard = await this._schema.findOne(fields);

    return { ...storedBoard._doc, id: storedBoard._doc._id };
  }

  public async find(fields: object): Promise<Board[]> {
    return this._schema.find(fields);
  }

  public async findByUserEmail(email: string): Promise<Board[]> {
    return this._schema.findByUserEmail(email);
  }

  public async save(board: Board): Promise<Board> {
    const targetBoard = new this._schema(board);
    const storedBoard = await targetBoard.save();

    return { ...storedBoard, id: storedBoard._id };
  }
}

module.exports = BoardCollection;
