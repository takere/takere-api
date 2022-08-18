
import Executed from "../domain/executed.domain";
import ExecutedRepository from "../repositories/executed.repository";

const repository = require('../repositories');

class ExecutedService {
  private executedRepository: ExecutedRepository; 

  constructor() {
    this.executedRepository = repository.executedRepository;
  }

  async insert(phrase: string, jobId: string): Promise<Executed> {
    return this.executedRepository.save({ result: phrase, node: jobId, id: undefined });
  }
}

module.exports = new ExecutedService();
