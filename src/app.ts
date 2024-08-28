import express, { Application, NextFunction, Request, Response } from 'express';
import router from './router/apiRouter';
import globalErrorHandler from './middleware/globalErrorHandler';
import responseMessage from './constants/responseMessage';
import httpError from './util/httpError';

import cors from 'cors';
import helmet from 'helmet';
const app: Application = express();

app.use(express.json());
app.use(helmet());
app.use(cors());

app.use('/api/v1', router);
// 404 Error Handler
app.use((req: Request, _: Response, next: NextFunction) => {
  try {
    throw new Error(responseMessage.NOT_FOUND('route'));
  } catch (error) {
    httpError(next, error, req, 404);
  }
});

// Global Error Handler
app.use(globalErrorHandler);
export default app;

