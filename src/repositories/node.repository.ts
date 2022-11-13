/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Node from '../domain/node.domain';


interface NodeRepository {

  /**
   * Stores a new node.
   * 
   * @param     node Node to be created
   * 
   * @return    Stored node
   */
  insert(node: Node): Promise<Node>;

  /**
   * Searches nodes by flow identifier.
   * 
   * @param     id Flow identifier to be searched
   * 
   * @return    Stored node or an empty list if there are no nodes with such
   * identifier
   */
  findAllByFlowId(id: string): Promise<Node[]>;

  /**
   * Searches a node by identifier.
   * 
   * @param     id Identifier to be searched
   * 
   * @return    Stored node or null if there is no node with such identifier
   */
  findById(id: string): Promise<Node>;

  /**
   * Removes all nodes with a flow identifier.
   * 
   * @param     flowId Flow identifier
   * 
   * @return    Removed nodes
   */
  removeAllWithFlowID(flowId: string): Promise<Node[]>;
}

export default NodeRepository;
