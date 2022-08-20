import Service = require('./service');
import Executed = require('../domain/executed.domain');
import ExecutedRepository = require('../repositories/executed.repository');

class ExecutedService extends Service {
  private executedRepository: ExecutedRepository; 

  constructor() {
    super();
    this.executedRepository = this.repository.executedRepository;
  }

  async insert(phrase: string, jobId: string): Promise<Executed> {
    return this.executedRepository.save({ result: phrase, node: jobId, id: undefined });
  }
}

export = ExecutedService;
