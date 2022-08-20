import Executed = require('../domain/executed.domain');

interface ExecutedRepository {
  save(executed: Executed): Promise<Executed>;
}

export = ExecutedRepository;
