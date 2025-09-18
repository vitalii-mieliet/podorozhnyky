import { Router } from 'express';
import {
  addStoryController,
  getStoriesController,
} from '../controllers/stories.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { upload } from '../middlewares/multer.js';
import { authenticate } from '../middlewares/authenticate.js';

const storyRouter = Router();

storyRouter.get('/', ctrlWrapper(getStoriesController));

storyRouter.post(
  '/',
  authenticate,
  upload.single('photo'),
  ctrlWrapper(addStoryController),
);

export default storyRouter;
