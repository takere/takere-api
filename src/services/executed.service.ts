import Service = require('./service');
import Executed = require('../domain/executed.domain');
import ExecutedDTO = require('../dto/executed.dto');
import ExecutedRepository = require('../repositories/executed.repository');

class ExecutedService extends Service {
  private executedRepository: ExecutedRepository; 

  constructor() {
    super();
    this.executedRepository = this.repository.executedRepository;
  }

  async insert(executed: ExecutedDTO): Promise<Executed> {
    return this.executedRepository.save(executed);
  }
}

export = ExecutedService;
