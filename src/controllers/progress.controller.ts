/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import BoardService from '../services/board.service';


class ProgressController {

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
  public async getProgress(req: any, res: any, next: any) {
    const patientEmail = await req?.query?.email;
    const progress = await this.boardService.findProgressByEmail(patientEmail);

    res.send(progress);
  }

  public async getPatientsProgress(req: any, res: any, next: any) {
    const user = await req.user;
    const progress = await this.boardService.findAllProgressWithFlowCreatedBy(user.id);

    res.send(progress);
  }

  public async getPatientProgress(req: any, res: any, next: any) {
    const flowId = await req.params.flowId;
    const patientId = await req.params.patientId;

    const progress = await this.boardService.findProgressByFlowAndPatient(flowId, patientId);

    res.send(progress);
  }
}

export default ProgressController;
