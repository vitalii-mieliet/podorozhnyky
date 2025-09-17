import express from 'express';
import { logoutUserController } from '../controllers/auth.js';

const authRouter = Router();
import authController from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { registerUserSchema } from '../validation/auth.js';

import { validateBody } from '../middlewares/validateBody.js';
import { registerUserSchema } from '../validation/auth.js';

import authController from '../controllers/auth.js';
import { logoutUserController } from '../controllers/auth.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(registerUserSchema),
  authController.register,
);

authRouter.post('/logout', logoutUserController);

export default authRouter;
