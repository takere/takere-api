/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Edge from '../domain/edge.domain';
import EdgeDTO from '../dto/edge.dto';


interface EdgeRepository {

  /**
   * Stores a new edge or updates one if it already exists.
   * 
   * @param     edge Edge to be created or updated
   * 
   * @return    Stored or updated edge
   */
  save(edge: EdgeDTO): Promise<Edge>;
  
  /**
   * Searches edges by source node.
   * 
   * @param     id Node identifier
   * 
   * @return    Stored edges or an empty list if there are no edges with such 
   * node identifier
   */
  findAllBySourceId(id: string): Promise<Edge[]>;

  /**
   * Searches edges by flow.
   * 
   * @param     id Flow identifier
   * 
   * @return    Stored edges or an empty list if there are no edges with such 
   * flow identifier
   */
  findAllByFlowId(id: string): Promise<Edge[]>;

  /**
   * Removes all edges that belongs to a flow.
   * 
   * @param     id Flow identifier
   * 
   * @return    Removed edges
   */
  removeAllWithFlowId(id: string): Promise<Edge[]>;
}

export default EdgeRepository;
