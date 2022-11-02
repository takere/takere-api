import Finished from '../domain/finished.domain';
import FinishedDTO from '../dto/finished.dto';

interface FinishedRepository {
  save(finished: FinishedDTO): Promise<Finished>;
  removeAllWithNodeId(id: string): Promise<Finished[]>;
}

export default FinishedRepository;
