/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Service from './service';
import Finished from '../domain/finished.domain';
import FinishedDTO from '../dto/finished.dto';
import FinishedRepository from '../repositories/finished.repository';


/**
 * Responsible for providing finished board services.
 */
class FinishedService extends Service {

  // --------------------------------------------------------------------------
  //         Attributes
  // --------------------------------------------------------------------------
  private finishedRepository: FinishedRepository; 


  // --------------------------------------------------------------------------
  //         Constructor
  // --------------------------------------------------------------------------
  constructor() {
    super();
    this.finishedRepository = this.repository.finishedRepository;
  }


  // --------------------------------------------------------------------------
  //         Methods
  // --------------------------------------------------------------------------
  async insert(finished: FinishedDTO): Promise<Finished> {
    return this.finishedRepository.save(finished);
  }

  public async removeAllWithNodeId(id: string): Promise<Finished[]> {
    return this.finishedRepository.removeAllWithNodeId(id);
  }
}

export default FinishedService;
