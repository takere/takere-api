/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

interface NodeDTO {
  slug: string,
  id?: string,
  name: string,
  description: string,
  type: string,
  color: string,
  icon: string,
  shape: string,
  input_list: string[],
  output_list: string[],
  content_type?: string,
  parameters: {
    slug: string,
    name: string,
    description: string,
    required: boolean,
    type: string | string[],
    options?: {
      value: string,
      label: string,
      request_input?: string
    }[]
  }[],
  icons?: string[]
}

export default NodeDTO;
