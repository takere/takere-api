/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import BoardService from '../services/board.service';


class AgendaController {

  // --------------------------------------------------------------------------
  //         Attributes
  // --------------------------------------------------------------------------
  private readonly boardService: BoardService;


  // --------------------------------------------------------------------------
  //         Constructor
  // --------------------------------------------------------------------------
  constructor() {
    this.boardService = new BoardService();
  }


  // --------------------------------------------------------------------------
  //         Methods
  // --------------------------------------------------------------------------
  public async getToday(req: any, res: any, next: any) {
    const patientEmail = await req?.query?.email;
    const cards = await this.boardService.findAllWithTodayDeadline(patientEmail);

    res.send(cards);
  }

  public async getTomorrow(req: any, res: any, next: any) {
    const patientEmail = await req?.query?.email;
    const cards = await this.boardService.findAllWithTomorrowDeadline(patientEmail);

    res.send(cards);
  }
}

export default AgendaController;
