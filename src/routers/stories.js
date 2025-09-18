import { Router } from 'express';
import {
  getAuthorByIdController,
  getStoriesAuthorsController,
  getStoriesByAuthorIdConntroller,
  getStoriesController,
  getStoryById,
} from '../controllers/stories.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';

const storyRouter = Router();

storyRouter.get('/', ctrlWrapper(getStoriesController));

storyRouter.get('/story/:id', isValidId, ctrlWrapper(getStoryById));

storyRouter.get(
  '/byauthor/:id',
  isValidId,
  ctrlWrapper(getStoriesByAuthorIdConntroller),
);

storyRouter.get('/authors', ctrlWrapper(getStoriesAuthorsController));

storyRouter.get(
  '/authors/:id',
  isValidId,
  ctrlWrapper(getAuthorByIdController),
);

export default storyRouter;
