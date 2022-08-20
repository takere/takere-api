import BoardRepository = require('../../board.repository');
import Board = require('../../../domain/board.domain');
import BoardDTO = require('../../../dto/board.dto');

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

  public async save(board: BoardDTO): Promise<Board> {
    const targetBoard = new this._schema({ ...board, completed: false, id: undefined });
    const storedBoard = await targetBoard.save();

    return { ...storedBoard, id: storedBoard._id };
  }
}

export = BoardCollection;
