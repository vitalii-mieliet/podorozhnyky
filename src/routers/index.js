import storyRouter from './stories.js';
import userRouter from './users.js';
import authRouter from './auth.js';
import onBoardRouter from './onboarding.js';

import { Router } from 'express';

const router = Router();

router.use('/stories', storyRouter);
router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/', onBoardRouter);

export default router;
