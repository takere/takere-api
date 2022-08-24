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
    const targetBoard = new this._schema({ ...board, completed: false });
    const storedBoard = await targetBoard.save();

    return { ...storedBoard._doc };
  }

  public async update(board: Board): Promise<Board> {
    const targetBoard = await this._schema.findById(board.id);
    
    targetBoard.content = board.content;
    targetBoard.description = board.description;
    targetBoard.name = board.name;
    targetBoard.executed = board.executed;
    targetBoard.userEmail = board.userEmail;

    const storedBoard = await targetBoard.save();

    return { ...storedBoard._doc };
  }
}

export = BoardCollection;
