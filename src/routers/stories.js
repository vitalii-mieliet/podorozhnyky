import { Router } from 'express';
import { getStoriesController } from '../controllers/stories.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const storyRouter = Router();

storyRouter.get('/', ctrlWrapper(getStoriesController));

export default storyRouter;
