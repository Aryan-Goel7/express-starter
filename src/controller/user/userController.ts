import { NextFunction, Request, Response } from 'express';
import httpResponse from '../../util/httpResponse';
import responseMessage from '../../constants/responseMessage';
import httpError from '../../util/httpError';
import { createUser, fetchUser } from '../../service/user/userService';
// import { asyncHandler } from '../../util/asyncHandler';
export default {
  postUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body;
      if (!name) {
        return httpError(next, 'Name must be provided', req, 422);
      }
      console.log(name);
      createUser(name);
      return httpResponse(req, res, 200, responseMessage.SUCCESS);
    } catch (error) {
      return httpError(next, error, req, 500);
    }
  },
  getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      //   const { name } = req.body;
      //   if (!name) {
      //     httpError(next, 'Name must be provided', req, 422);
      //   }
      const data = fetchUser();
      return httpResponse(req, res, 200, responseMessage.SUCCESS, data);
    } catch (error) {
      return httpError(next, error, req, 500);
    }
  },
};

