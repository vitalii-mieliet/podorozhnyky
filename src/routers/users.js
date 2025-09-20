import { Router } from 'express';
import {
  deleteUserArticleController,
  getUserAllSavedArticle,
  getUserInfoController,
  saveUserArticleController,
} from '../controllers/users.js';
import { authenticate } from '../middlewares/authenticate.js';
import { onboardingController } from '../controllers/users.js';
import { onboardingCompletedSchema } from '../validation/auth.js';
import { validateBody } from '../middlewares/validateBody.js';

const userRouter = Router();

userRouter.get('/info', authenticate, getUserInfoController);

userRouter.patch(
  '/onboarding',
  validateBody(onboardingCompletedSchema),
  onboardingController,
);

userRouter.post('/save-article/:id', authenticate, saveUserArticleController);

userRouter.delete(
  '/save-article/:id',
  authenticate,
  deleteUserArticleController,
);

userRouter.get('/save-article', authenticate, getUserAllSavedArticle);

export default userRouter;
