import BoardRepository = require('../../board.repository');
import Board = require('../../../domain/board.domain');
import BoardDTO = require('../../../dto/board.dto');

class BoardCollection implements BoardRepository {
  private _schema: any;

  constructor() {
    this._schema = require('../schemas/board.schema');
  }
  
  public async findAll(email: string): Promise<Board[]> {
    const formattedBoards: any[] = [];
    const boards = await this._schema.findAll();

    boards.forEach((board: any, index: number) => {
      formattedBoards.push({
        name: board.name,
        description: board.description,
        patientEmail: board.patientEmail,
        flow: { id: board.flow.id.toString() },
        node: board.node._doc,
        finished: board.finished ? this.formatFinished(board.finished._doc) : undefined
      });
    });

    return formattedBoards;
  }

  private formatFinished(finished: any) {
    return {
      answers: finished.answers,
      date: finished.createdAt
    }
  }
  
  public async findAllFinishedByEmail(email: string): Promise<any[]> {
    const boards = await this._schema.findAllFinishedByEmail(email);

    return this.formatBoards(boards);
  }

  private formatBoards(boards: Board[]): any[] {
    const formattedBoards: any[] = [];

    boards.forEach((board: any, index: number) => {
      formattedBoards.push({
        name: board.name,
        description: board.description,
        patientEmail: board.patientEmail,
        flow: board.flow,
        node: board.node,
        finished: board.finished ? this.formatFinished(board.finished) : undefined
      });
    });

    return formattedBoards;
  }
    
  public async findOne(fields: object): Promise<Board> {
    const storedBoard = await this._schema.findOne(fields);

    return { ...storedBoard._doc, id: storedBoard._doc._id };
  }

  public async find(fields: object): Promise<Board[]> {
    return this._schema.find(fields);
  }

  public async findAllUnfinishedByEmail(email: string): Promise<Board[]> {
    return this._schema.findAllUnfinishedByEmail(email);
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

  public async findBoard(nodeId: string, flowId: string): Promise<Board> {
    return this._schema.find({ node: nodeId, flow: flowId });
  }

  public async findAllByFlowAndPatient(flowId: string, patientEmail: string): Promise<Board[]> {
    const boards = await this._schema.findAll();
    
    return this.formatBoards(boards)
      .filter((board: Board) => board.flow.id.toString() === flowId)
      .filter((board: Board) => board.flow.patientEmail === patientEmail);
  }
  
  public async findAllByAuthor(userId: string): Promise<Board[]> {
    const boards = await this._schema.findAll();
    
    return boards
      .filter((board: Board) => board.flow.author.toString() == userId);
  }
}

export = BoardCollection;
