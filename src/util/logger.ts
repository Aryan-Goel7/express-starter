import { createLogger, format, transports } from 'winston';
import {
  ConsoleTransportInstance,
  FileTransportInstance,
} from 'winston/lib/winston/transports';
import util from 'util';
import config from '../config/config';
import { EApplicationEnvironment } from '../constants/application';
import path from 'path';
import * as sourceMapSupport from 'source-map-support';
import { red, blue, yellow, green, magenta } from 'colorette';

sourceMapSupport.install();

const colorizeLevel = (level: string): string => {
  switch (level) {
    case 'ERROR':
      return red(level);
    case 'INFO':
      return blue(level);
    case 'WARN':
      return yellow(level);
    default:
      return level;
  }
};

const consoleLogFormat = format.printf((info): string => {
  const { level, message, timestamp, meta = {} } = info;
  const customLevel = colorizeLevel(level.toUpperCase());
  const customTimeStamp = green(timestamp);
  const customMessage = message;
  const customMeta = util.inspect(meta, {
    showHidden: false,
    depth: null,
  });
  const customLog = `${customLevel} [${customTimeStamp}] ${customMessage}\n${magenta('META')} ${customMeta}\n`;
  return customLog;
});

const consoleTransport = (): Array<ConsoleTransportInstance> => {
  if (config.ENV === EApplicationEnvironment.DEVELOPMENT) {
    return [
      new transports.Console({
        level: 'info',
        format: format.combine(format.timestamp(), consoleLogFormat),
      }),
    ];
  }
  return [];
};

const fileLogFormat = format.printf((info): string => {
  const { level, message, timestamp, meta = {} } = info;
  const logMeta: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(meta)) {
    if (value instanceof Error) {
      logMeta[key] = {
        name: value.name,
        message: value.message,
        trace: value.stack || '',
      };
    } else {
      logMeta[key] = value;
    }
  }
  const logData = {
    level: colorizeLevel(level.toUpperCase()),
    message,
    timestamp: green(timestamp),
    meta: logMeta,
  };
  return JSON.stringify(logData, null, 4);
});

const fileTransport = (): Array<FileTransportInstance> => {
  if (config.ENV === EApplicationEnvironment.DEVELOPMENT) {
    return [
      new transports.File({
        filename: path.join(
          __dirname,
          '../',
          '../',
          'logs',
          `${config.ENV}.log`
        ),
        level: 'info',
        format: format.combine(format.timestamp(), fileLogFormat),
      }),
    ];
  }
  return [];
};

export default createLogger({
  defaultMeta: {
    meta: {},
  },
  transports: [...consoleTransport(), ...fileTransport()],
});

