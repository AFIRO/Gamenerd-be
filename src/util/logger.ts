// const winston = require('winston')
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;
import * as winston from 'winston'

export class Logger {

  private logger;

  constructor() {
    const formatting = printf(({ level, message, label, timestamp }) => {
      return `${level} - ${timestamp}: ${message}`;
    });

    this.logger = winston.createLogger({
      level: 'info',
      format: combine(timestamp(), format.cli(), formatting),
      transports: [
        new winston.transports.File({ filename: 'info.log', level: 'info' }),
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'all.log' }),
        new winston.transports.Console()
      ]
    });
  }

  public info(message: string) {

    this.logger.info(message)

  }

  public error(message: string) {
    this.logger.error(message)

  }

}