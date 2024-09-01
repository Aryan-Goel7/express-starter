import { Router } from 'express';
import userController from '../../controller/user/userController';
const router = Router();

router.get('/users', userController.getUsers);
router.post('/users', userController.postUser);

export default router;
