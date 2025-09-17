import { Router } from 'express';
import { logoutUserController } from '../controllers/auth.js';

const authRouter = Router();

authRouter.post('/api/auth', logoutUserController);

export default authRouter;
