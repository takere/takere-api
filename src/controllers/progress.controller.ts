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
}

export = ProgressController;
