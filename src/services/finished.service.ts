import Service = require('./service');
import Finished = require('../domain/finished.domain');
import FinishedDTO = require('../dto/finished.dto');
import FinishedRepository = require('../repositories/finished.repository');

class FinishedService extends Service {
  private finishedRepository: FinishedRepository; 

  constructor() {
    super();
    this.finishedRepository = this.repository.finishedRepository;
  }

  async insert(finished: FinishedDTO): Promise<Finished> {
    return this.finishedRepository.save(finished);
  }
}

export = FinishedService;
