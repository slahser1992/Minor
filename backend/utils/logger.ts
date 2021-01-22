import { GraphQLError } from 'graphql';
import winston from 'winston';

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: 'logs/info.log',
      level: 'info'
    }),
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error'
    }),
    new winston.transports.File({
      filename: 'logs/warn.log',
      level: 'warn',
    }),
  ],
});

class Logger {
  info(msg: string) {
    logger.info(`-----${new Date()}-----`);
    logger.info(`-----[info]: ${msg}`);
  }

  error(msg: GraphQLError) {
    logger.error(`-----${new Date()}-----`);
    logger.error(`-----[path]: ${msg.path}-----`);
    logger.error(`-----[error]: ${msg.message}-----`);
  }
} 

export default new Logger();