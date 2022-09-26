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

  public async findByEmail(email: string): Promise<Board[]> {
    return this._schema.findByEmail(email);
  }

  public async save(board: BoardDTO): Promise<Board> {
    const targetBoard = new this._schema({ ...board, completed: false });
    const storedBoard = await targetBoard.save();

    return { ...storedBoard._doc };
  }

  public async update(board: Board): Promise<Board> {
    const targetBoard = await this._schema.findById(board.id);
    
    targetBoard.description = board.description;
    targetBoard.name = board.name;
    targetBoard.finished = board.finished;
    targetBoard.userEmail = board.patientEmail;

    const storedBoard = await targetBoard.save();

    return { ...storedBoard._doc };
  }

  public async removeAllWithFlowId(id: any): Promise<Board[]> {
    return this._schema.deleteMany({ flow: id });
  }
}

export = BoardCollection;
