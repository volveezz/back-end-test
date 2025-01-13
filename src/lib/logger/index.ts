import chalk from 'chalk';
import winston from 'winston';
import 'winston-daily-rotate-file';

export const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console(),
    new winston.transports.DailyRotateFile({
      filename: '%DATE%.log',
      dirname: 'logs',
      maxFiles: '7d',
    }),
  ],
  format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
});

// eslint-disable-next-line no-console
export const log = (...params: any[]) => console.log(chalk.blue.bold('[Test Server]'), ...params);
