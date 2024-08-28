import { Request } from 'express';
import responseMessage from '../constants/responseMessage';
import { THttpError } from '../types/types';
import { EApplicationEnvironment } from '../constants/application';
import config from '../config/config';
import logger from './logger';
export default (
  err: Error | unknown,
  req: Request,
  errorStatusCode: number = 500
): THttpError => {
  const errorObj: THttpError = {
    success: false,
    statusCode: errorStatusCode,
    request: {
      ip: req.ip || null,
      method: req.method,
      url: req.originalUrl,
    },
    message:
      err instanceof Error
        ? err.message || responseMessage.SOMETHING_WENT_WRONG
        : responseMessage.SOMETHING_WENT_WRONG,
    data: null,
    trace: err instanceof Error ? { error: err.stack } : null,
  };

  logger.error('CONTROLLER ERROR', {
    meta: errorObj,
  });
  if (config.ENV === EApplicationEnvironment.PRODUCTION) {
    delete errorObj.request.ip;
  }
  return errorObj;
};

