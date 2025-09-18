import { Router } from 'express';
import {
  getStoriesAuthorsController,
  getStoriesController,
} from '../controllers/stories.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const storyRouter = Router();

storyRouter.get('/', ctrlWrapper(getStoriesController));

storyRouter.get('/authors', ctrlWrapper(getStoriesAuthorsController));

export default storyRouter;
