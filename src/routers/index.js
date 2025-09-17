import storyRouter from './stories.js';
import userRouter from './users.js';
import authRouter from './auth.js';

import { Router } from 'express';

const router = Router();

router.use('/api/stories', storyRouter);
router.use('/api/users', userRouter);
router.use('/api/auth', authRouter);

export default router;
