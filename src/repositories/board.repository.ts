/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Board from '../domain/board.domain';
import BoardDTO from '../dto/board.dto';


interface BoardRepository {

  /**
   * Searches boards by flow and patient.
   * 
   * @param     flowId Flow identifier
   * @param     patientEmail Patient email
   * 
   * @return    Stored boards or an empty list if no boards have been found
   */
  findAllByFlowAndPatient(flowId: string, patientEmail: string): Promise<Board[]>;

  /**
   * Searches boards that were created by a user.
   * 
   * @param     userId User identifier
   * 
   * @return    Stored boards or an empty list if no boards have been found
   */
  findAllByAuthor(userId: string): Promise<Board[]>;

  /**
   * Searches finished and unfinished boards that belongs to a user.
   * 
   * @param     email User email
   * 
   * @return    Stored boards or an empty list if no boards have been found
   */
  findAll(email: string): Promise<Board[]>;

  /**
   * Searches finished boards that belongs to a user.
   * 
   * @param     email User email
   * 
   * @return    Stored boards or an empty list if no boards have been found
   */
  findAllFinishedByEmail(email: string): Promise<Board[]>;

  /**
   * Searches unfinished boards that belongs to a user.
   * 
   * @param     email User email
   * 
   * @return    Stored boards or an empty list if no boards have been found
   */
  findAllUnfinishedByEmail(email: string): Promise<Board[]>;

  /**
   * Searches a board that belongs to a node along with a flow.
   * 
   * @param     nodeId Node identifier
   * @param     flowId Flow identifier
   * 
   * @return    Stored board or null if no board has been found
   */
  findBoard(nodeId: string, flowId: string): Promise<Board>;

  /**
   * Searches a board by identifier.
   * 
   * @param     id Board identifier
   * 
   * @return    Stored board or null if there is no board with such identifier
   */
  findById(id: string): Promise<Board>;

  /**
   * Stores a new board.
   * 
   * @param     board Board to be created
   * 
   * @return    Stored board
   */
  save(board: BoardDTO): Promise<Board>;

  /**
   * Updates a board.
   * 
   * @param     board Board to be updated
   * 
   * @return    Stored board
   */
  update(board: Board): Promise<Board>;

  /**
   * Removes all boards that belongs to a flow.
   * 
   * @param     id Flow identifier
   * 
   * @return    Removed boards
   */
  removeAllWithFlowId(id: any): Promise<Board[]>;
}

export default BoardRepository;
