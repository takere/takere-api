import winston from 'winston';
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

const loggerConfig = winston.createLogger({
  transports: [
    new winston.transports.Console(),
  ],
  exitOnError: false,
});

if (process.env.NODE_ENV !== 'production') {
  loggerConfig.add(buildDebugTransporter());
  loggerConfig.add(buildInfoTransporter());
  loggerConfig.add(buildErrorTransporter());
}

function buildDebugTransporter(): winston.transport {
  return new winston.transports.Console({
    level: 'debug',
    format: winston.format.combine(
      winston.format.simple(),
      winston.format.printf((msg: { level: any; message: any; }) => colorizer.colorize(msg.level, `${msg.level} - ${msg.message}`)
      )
    ),
  });
}

function buildInfoTransporter(): any {
  return new winston.transports.Console({
    level: 'info',
    format: winston.format.combine(
      winston.format.simple(),
      winston.format.printf((msg: { level: any; message: any; }) => colorizer.colorize(msg.level, `${msg.level} - ${msg.message}`)
      )
    ),
  });
}

function buildErrorTransporter(): any {
  return new winston.transports.Console({
    level: 'error',
    format: winston.format.combine(
      winston.format.simple(),
      winston.format.printf((msg: { level: any; message: any; }) => colorizer.colorize(msg.level, `${msg.level} - ${msg.message}`)
      )
    ),
  });
}

export default loggerConfig;