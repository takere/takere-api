import Executed = require('../domain/executed.domain');
import ExecutedDTO = require('../dto/executed.dto');

interface ExecutedRepository {
  save(executed: ExecutedDTO): Promise<Executed>;
}

export = ExecutedRepository;
