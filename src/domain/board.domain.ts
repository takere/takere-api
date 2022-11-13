/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

interface Board {
  id: string,
  name: string,
  description: string,
  patientEmail: string,
  flow: any,
  node: any,
  finished: any
}

export default Board;
