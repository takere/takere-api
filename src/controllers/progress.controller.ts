import BoardService = require('../services/board.service');

class ProgressController {
  private boardService: BoardService;

  constructor() {
    this.boardService = new BoardService();
  }

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
    const user = await req.user;
    const flowId = await req.params.flowId;
    const patientId = await req.params.patientId;

    const progress = await this.boardService.findProgressByFlowAndPatient(flowId, patientId);

    res.send(progress);
  }
}

export = ProgressController;
