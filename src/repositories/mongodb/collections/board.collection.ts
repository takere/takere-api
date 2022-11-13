/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import mongoose from "mongoose";
import BoardRepository from '../../board.repository';
import Board from '../../../domain/board.domain';
import BoardDTO from '../../../dto/board.dto';
import BoardSchema from '../schemas/board.schema';

class BoardCollection implements BoardRepository {

  // --------------------------------------------------------------------------
  //         Attributes
  // --------------------------------------------------------------------------
  private readonly schema: any;


  // --------------------------------------------------------------------------
  //         Constructor
  // --------------------------------------------------------------------------
  constructor() {
    this.schema = mongoose.model<Board>("Board", BoardSchema);
  }
  

  // --------------------------------------------------------------------------
  //         Methods
  // --------------------------------------------------------------------------
  public async findAll(email: string): Promise<Board[]> {
    const formattedBoards: any[] = [];
    const boards = await this.schema.findAll();

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
    const boards = await this.schema.findAllFinishedByEmail(email);

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
    
  public async findById(id: string): Promise<Board> {
    const storedBoard = await this.schema.findOne({ _id: id });

    return { ...storedBoard._doc, id: storedBoard._doc._id };
  }

  public async findAllUnfinishedByEmail(email: string): Promise<Board[]> {
    return this.schema.findAllUnfinishedByEmail(email);
  }

  public async save(board: BoardDTO): Promise<Board> {
    const targetBoard = new this.schema({ ...board, completed: false });
    const storedBoard = await targetBoard.save();

    return { ...storedBoard._doc };
  }

  public async update(board: Board): Promise<Board> {
    const targetBoard = await this.schema.findById(board.id);
    
    targetBoard.description = board.description;
    targetBoard.name = board.name;
    targetBoard.finished = board.finished;
    targetBoard.userEmail = board.patientEmail;

    const storedBoard = await targetBoard.save();

    return { ...storedBoard._doc };
  }

  public async removeAllWithFlowId(id: any): Promise<Board[]> {
    return this.schema.deleteMany({ flow: id });
  }

  public async findBoard(nodeId: string, flowId: string): Promise<Board> {
    return this.schema.find({ node: nodeId, flow: flowId });
  }

  public async findAllByFlowAndPatient(flowId: string, patientEmail: string): Promise<Board[]> {
    const boards = await this.schema.findAll();
    
    return this.formatBoards(boards)
      .filter((board: Board) => board.flow.id.toString() === flowId)
      .filter((board: Board) => board.flow.patientEmail === patientEmail);
  }
  
  public async findAllByAuthor(userId: string): Promise<Board[]> {
    const boards = await this.schema.findAll();
    
    return boards
      .filter((board: Board) => board.flow.author.toString() == userId);
  }
}

export default BoardCollection;
