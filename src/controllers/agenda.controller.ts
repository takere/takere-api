import BoardService = require('../services/board.service');

class AgendaController {
  private boardService: BoardService;

  constructor() {
    this.boardService = new BoardService();
  }

  public async getToday(req: any, res: any, next: any) {
    const user = await req.user;
    const cards = await this.boardService.findAllWithTodayDeadline(user.id);

    res.send(cards);
  }

  public async getTomorrow(req: any, res: any, next: any) {
    const user = await req.user;
    const cards = await this.boardService.findAllWithTomorrowDeadline(user.id);

    res.send(cards);
  }
}

export = AgendaController;
