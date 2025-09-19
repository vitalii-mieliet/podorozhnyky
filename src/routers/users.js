import { Router } from 'express';
import { getUserInfoController } from '../controllers/users.js';
import { authenticate } from '../middlewares/authenticate.js';

const userRouter = Router();

userRouter.get('/', authenticate, getUserInfoController);

export default userRouter;
