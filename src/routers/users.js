import { Router } from 'express';
import { getUserInfoController } from '../controllers/users.js';
import { authenticate } from '../middlewares/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const userRouter = Router();

userRouter.get('/', authenticate, ctrlWrapper(getUserInfoController));

export default userRouter;
