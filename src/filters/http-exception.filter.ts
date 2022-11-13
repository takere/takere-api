/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import morgan from 'morgan';
import generalConfig from '../config/general.config';
import logger from '../config/logger.config';


morgan.token('message', (req: any, res: any) => res.locals.errorMessage || '');

const ipFormat = (generalConfig.environment === 'production') ? ':remote-addr - ' : '';
const successResponseFormat = `${ipFormat}:method :url :status - :response-time ms`;
const errorResponseFormat = `${ipFormat}:method :url :status - :response-time ms - message: :message`;

export const successHandler = morgan(successResponseFormat, {
  skip: (req: any, res: { statusCode: number; }) => res.statusCode >= 400,
  stream: { write: (message: string) => logger.info(message.trim()) },
});

export const errorHandler = morgan(errorResponseFormat, {
  skip: (req: any, res: { statusCode: number; }) => res.statusCode < 400,
  stream: { write: (message: string) => logger.error(message.trim()) },
});

