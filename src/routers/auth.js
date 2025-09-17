import express from 'express';
import authController from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { registerUserSchema } from '../validation/auth.js';

const authRouter = express.Router();

authRouter.post(
  '/register',
  validateBody(registerUserSchema),
  authController.register,
);

export default authRouter;