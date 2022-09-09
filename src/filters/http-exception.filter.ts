const morgan = require('morgan');
const generalConfig = require('../config/general.config');
const logger = require('../config/logger.config');

morgan.token('message', (req: any, res: { locals: { errorMessage: any; }; }) => res.locals.errorMessage || '');

const getIpFormat = () => (generalConfig.environment === 'production' ? ':remote-addr - ' : '');
const successResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`;
const errorResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`;

const successHandler = morgan(successResponseFormat, {
  skip: (req: any, res: { statusCode: number; }) => res.statusCode >= 400,
  stream: { write: (message: string) => logger.info(message.trim()) },
});

const errorHandler = morgan(errorResponseFormat, {
  skip: (req: any, res: { statusCode: number; }) => res.statusCode < 400,
  stream: { write: (message: string) => logger.error(message.trim()) },
});

module.exports = {
  successHandler,
  errorHandler,
};
