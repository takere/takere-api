/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Service from './service';
import Edge from '../domain/edge.domain';
import EdgeDTO from '../dto/edge.dto';
import EdgeRepository from '../repositories/edge.repository';


/**
 * Responsible for providing edge services.
 */
class EdgeService extends Service {

  // --------------------------------------------------------------------------
  //         Attributes
  // --------------------------------------------------------------------------
  private edgeRepository: EdgeRepository; 


  // --------------------------------------------------------------------------
  //         Constructor
  // --------------------------------------------------------------------------
  constructor() {
    super();
    this.edgeRepository = this.repository.edgeRepository;
  }


  // --------------------------------------------------------------------------
  //         Methods
  // --------------------------------------------------------------------------
  async findAllBySourceId(id: string): Promise<Edge[]> {
    return this.edgeRepository.findAllBySourceId(id);
  }

  async findAllByFlowId(id: string): Promise<Edge[]> {
    return this.edgeRepository.findAllByFlowId(id);
  }

  async removeAllWithFlowId(id: string): Promise<Edge[]> {
    return this.edgeRepository.removeAllWithFlowId(id);
  }

  async insert(edge: EdgeDTO): Promise<Edge> {
    return this.edgeRepository.save(edge);
  }
}

export default EdgeService;
