import { NextFunction, Request, Response } from 'express';
import httpResponse from '../util/httpResponse';
import responseMessage from '../constants/responseMessage';
import httpError from '../util/httpError';
import quicker from '../util/quicker';

export default {
  self: (req: Request, res: Response, next: NextFunction) => {
    try {
      //   throw new Error('This is a error');
      httpResponse(req, res, 200, responseMessage.SUCCESS);
    } catch (error) {
      httpError(next, error, req, 500);
    }
  },
  health: (req: Request, res: Response, next: NextFunction) => {
    try {
      const systemData = quicker.getSystemHealth();
      const serverData = quicker.getServerHealth();
      const healthData = {
        application: serverData,
        system: systemData,
        timestamp: Date.now(),
      };
      httpResponse(req, res, 200, responseMessage.SUCCESS, healthData);
    } catch (error) {
      httpError(next, error, req, 500);
    }
  },
};

