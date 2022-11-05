import Service from './service';
import Finished from '../domain/finished.domain';
import FinishedDTO from '../dto/finished.dto';
import FinishedRepository from '../repositories/finished.repository';

class FinishedService extends Service {
  private finishedRepository: FinishedRepository; 

  constructor() {
    super();
    this.finishedRepository = this.repository.finishedRepository;
  }

  async insert(finished: FinishedDTO): Promise<Finished> {
    return this.finishedRepository.save(finished);
  }

  public async removeAllWithNodeId(id: string): Promise<Finished[]> {
    return this.finishedRepository.removeAllWithNodeId(id);
  }
}

export default FinishedService;
