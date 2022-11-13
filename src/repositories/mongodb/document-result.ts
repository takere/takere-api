/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

interface DocumentResult<T> {
  _id: string;
  _doc: T;
}

export default DocumentResult;
