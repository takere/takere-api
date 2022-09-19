import Finished = require('../domain/finished.domain');
import FinishedDTO = require('../dto/finished.dto');

interface FinishedRepository {
  save(finished: FinishedDTO): Promise<Finished>;
}

export = FinishedRepository;
