const winston = require('winston');
const colorizer = winston.format.colorize();

const options = {
  file: {
    level: 'debug',
    filename: `../logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  }
};

const logger = winston.createLogger({
  transports: [
    // new winston.transports.File(options.file),
    new winston.transports.Console(),
  ],
  exitOnError: false,
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      level: 'debug',
      format: winston.format.combine(
        winston.format.simple(),
        winston.format.printf(msg =>
          colorizer.colorize(msg.level, `${msg.level} - ${msg.message}`)
        )
      ),
    }),
    new winston.transports.Console({
      level: 'info',
      format: winston.format.combine(
        winston.format.simple(),
        winston.format.printf(msg =>
          colorizer.colorize(msg.level, `${msg.level} - ${msg.message}`)
        )
      ),
    }),
    new winston.transports.Console({
      level: 'error',
      format: winston.format.combine(
        winston.format.simple(),
        winston.format.printf(msg =>
          colorizer.colorize(msg.level, `${msg.level} - ${msg.message}`)
        )
      ),
    }),
  );
}

logger.stream = {
  write: function(message, encoding) {
    logger.info(message);
  },
};

module.exports = logger;