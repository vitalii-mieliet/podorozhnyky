import { Router } from 'express';
import {
  getAuthorByIdController,
  getStoriesAuthorsController,
  getStoriesController,
  getStoryById,
} from '../controllers/stories.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';

const storyRouter = Router();

storyRouter.get('/', ctrlWrapper(getStoriesController));

storyRouter.get('/:id', isValidId, ctrlWrapper(getStoryById));

storyRouter.get('/authors', ctrlWrapper(getStoriesAuthorsController));

storyRouter.get(
  '/authors/:id',
  isValidId,
  ctrlWrapper(getAuthorByIdController),
);

export default storyRouter;
