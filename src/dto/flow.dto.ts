/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Edge from "../domain/edge.domain";
import Node from "../domain/node.domain";


interface FlowDTO {
  author: any,
  name: string,
  description: string,
  patientEmail: string,
  nodes: Node[],
  edges: Edge[]
}

export default FlowDTO;
