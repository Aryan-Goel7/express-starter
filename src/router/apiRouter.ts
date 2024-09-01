import { Router } from 'express';
import apiController from '../controller/apiController';
import userRouter from './user/userRouter';
const router = Router();

router.route('/self').get(apiController.self);
router.route('/health').get(apiController.health);
router.use(userRouter);
export default router;

