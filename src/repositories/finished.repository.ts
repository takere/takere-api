/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Finished from '../domain/finished.domain';
import FinishedDTO from '../dto/finished.dto';


interface FinishedRepository {

  /**
   * Stores a new board progress or updates one if it already exists.
   * 
   * @param     finished Progress to be created or updated
   * 
   * @return    Stored or updated progress
   */
  save(finished: FinishedDTO): Promise<Finished>;
  
  /**
   * Removes all finished progress that belongs to a node.
   * 
   * @param     id Node identifier
   * 
   * @return    Removed board progress
   */
  removeAllWithNodeId(id: string): Promise<Finished[]>;
}

export default FinishedRepository;
