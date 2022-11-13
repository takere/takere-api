/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import BoardService from '../services/board.service';
import FinishedService from '../services/finished.service';

class BoardController {

  // --------------------------------------------------------------------------
  //         Attributes
  // --------------------------------------------------------------------------
  private readonly boardService: BoardService;
  private readonly finishedService: FinishedService;


  // --------------------------------------------------------------------------
  //         Constructor
  // --------------------------------------------------------------------------
  constructor() {
    this.boardService = new BoardService();
    this.finishedService = new FinishedService();
  }

  
  // --------------------------------------------------------------------------
  //         Methods
  // --------------------------------------------------------------------------
  public async get(req: any, res: any, next: any) {
    const searchEmail = await req?.query?.email;
    const boards = await this.boardService.findAllUnfinishedByEmail(searchEmail);

    res.send(boards);
  }

  public async resolve(req: any, res: any, next: any) {
    const { boardId, answers } = req.body
    const updatedBoard = await this.boardService.resolve(boardId, answers);
    
    res.send(updatedBoard);
  }
}

export default BoardController;
