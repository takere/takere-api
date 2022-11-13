/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Flow from '../domain/flow.domain';
import FlowDTO from '../dto/flow.dto';


interface FlowRepository {

  /**
   * Searches flows by identifier and author.
   * 
   * @param     authorId Author identifier
   * @param     flowId Flow identifier
   * 
   * @return    Stored flows or an empty list if there are no flows with such 
   * author and flow identifier
   */
  findByAuthorAndFlow(authorId: string, flowId: string): Promise<Flow>;

  /**
   * Searches flows by author.
   * 
   * @param     authorId Author identifier
   * 
   * @return    Stored flows or an empty list if there are no flows with such 
   * author identifier
   */
  findAllByAuthor(authorId: string): Promise<Flow[]>;

  /**
   * Searches a flow by identifier.
   * 
   * @param     flowId Flow identifier
   * 
   * @return    Stored flow or null if there is no flow with such identifier
   */
  findById(id: string): Promise<Flow>;

  /**
   * Stores a new flow or updates one if it already exists.
   * 
   * @param     flow Flow to be created or updated
   * 
   * @return    Stored or updated flow
   */
  save(flow: FlowDTO): Promise<Flow>;
  
  /**
   * Removes all flows with an author and flow identifier.
   * 
   * @param     authorId Author identifier
   * @param     flowId Flow identifier
   * 
   * @return    Removed flows
   */
  removeByAuthorAndFlow(authorId: string, flowId: string): Promise<Flow>;
}

export default FlowRepository;
