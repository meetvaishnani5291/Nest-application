import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

const infoTransport: DailyRotateFile = new DailyRotateFile({
  filename: 'logs/info/application-%DATE%.info.log',
  datePattern: 'YYYY-MM-DD-HH',
  //   zippedArchive: true,
  maxSize: '20m',
  level: 'info',
});

const errorTransport: DailyRotateFile = new DailyRotateFile({
  filename: 'logs/error/application-%DATE%.error.log',
  datePattern: 'YYYY-MM-DD-HH',
  // zippedArchive: true,
  maxSize: '20m',
  level: 'error',
});

export const logger = winston.createLogger({
  transports: [infoTransport, errorTransport],
});
