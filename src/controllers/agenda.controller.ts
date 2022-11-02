import BoardService from '../services/board.service';

class AgendaController {
  private boardService: BoardService;

  constructor() {
    this.boardService = new BoardService();
  }

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
