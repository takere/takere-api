/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import winston from 'winston';
import generalConfig from './general.config';


// ----------------------------------------------------------------------------
//         Constants
// ----------------------------------------------------------------------------
const colorizer = winston.format.colorize();
const loggerConfig = buildLogger();

export default loggerConfig;


// ----------------------------------------------------------------------------
//         Functions
// ----------------------------------------------------------------------------
function buildLogger(): winston.Logger {
  const logger = winston.createLogger({
    transports: [
      new winston.transports.Console(),
    ],
    exitOnError: false,
  });
  
  if (generalConfig.environment !== 'production') {
    logger.add(buildDebugTransporter());
    logger.add(buildInfoTransporter());
    logger.add(buildErrorTransporter());
  }

  return logger;
}

function buildDebugTransporter(): winston.transport {
  return new winston.transports.Console({
    level: 'debug',
    format: winston.format.combine(
      winston.format.simple(),
      winston.format.printf(msg => 
        colorizer.colorize(msg.level, `${msg.level} - ${msg.message}`)
      )
    ),
  });
}

function buildInfoTransporter(): any {
  return new winston.transports.Console({
    level: 'info',
    format: winston.format.combine(
      winston.format.simple(),
      winston.format.printf(msg => 
        colorizer.colorize(msg.level, `${msg.level} - ${msg.message}`)
      )
    ),
  });
}

function buildErrorTransporter(): any {
  return new winston.transports.Console({
    level: 'error',
    format: winston.format.combine(
      winston.format.simple(),
      winston.format.printf(msg =>
        colorizer.colorize(msg.level, `${msg.level} - ${msg.message}`)
      )
    ),
  });
}
