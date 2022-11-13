/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import NodeDTO from "../../dto/node.dto";
import BeginNode from "./begin";
import ConditionalNode from "./conditional";
import ExplanationNode from "./explanation";
import MedicationControlNode from "./medication-control";
import OrientationNode from "./orientation";
import QuizNode from "./quiz";
import ReminderNode from "./reminder";


const nodes: NodeDTO[] = [
  BeginNode,
  ConditionalNode,
  ExplanationNode,
  OrientationNode,
  QuizNode,
  ReminderNode,
  MedicationControlNode
];

export default nodes;
