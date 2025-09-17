import express from 'express';

import { onboardingController } from '../controllers/onboarding.js';
import { onboardingCompletedSchema } from '../validation/auth.js';
import { validateBody } from '../middlewares/validateBody.js';

//---------------------------------------------------------------

const onBoardRouter = express.Router();

onBoardRouter.patch(
  '/onboarding',
  validateBody(onboardingCompletedSchema),
  onboardingController,
);

export default onBoardRouter;
