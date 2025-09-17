import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import { logoutUserController } from '../controllers/auth.js';
import authController from '../controllers/auth.js';

import { registerUserSchema } from '../validation/auth.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(registerUserSchema),
  authController.register,
);

authRouter.post('/logout', ctrlWrapper(logoutUserController));

export default authRouter;
