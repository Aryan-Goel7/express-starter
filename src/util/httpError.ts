import { NextFunction, Request } from 'express';
import errorObject from './errorObject';
import { THttpError } from '../types/types';
// import

export default (
  nextFunc: NextFunction,
  err: Error | unknown,
  req: Request,
  errorStatusCode: number = 500
): void => {
  const errorObj: THttpError = errorObject(err, req, errorStatusCode);
  return nextFunc(errorObj);
};

