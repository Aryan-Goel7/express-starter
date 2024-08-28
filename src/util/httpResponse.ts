import { Request, Response } from 'express';
import { THttpResponse } from '../types/types';
import config from '../config/config';
import { EApplicationEnvironment } from '../constants/application';
import logger from './logger';
export default (
  req: Request,
  res: Response,
  responseStatusCode: number,
  responseMessage: string,
  data: unknown = null
) => {
  const response: THttpResponse = {
    success: true,
    statusCode: responseStatusCode,
    message: responseMessage,
    request: {
      ip: req.ip || null,
      method: req.method,
      url: req.originalUrl,
    },
    data,
  };
  logger.info('CONTROLLER LOG', {
    meta: response,
  });
  if (config.ENV === EApplicationEnvironment.PRODUCTION) {
    delete response.request.ip;
  }
  res.status(responseStatusCode).json(response);
};

