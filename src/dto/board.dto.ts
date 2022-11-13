/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

interface BoardDTO {
  name: string,
  description: string,
  patientEmail: string,
  flow: string,
  node?: string,
  finished: any
}

export default BoardDTO;
