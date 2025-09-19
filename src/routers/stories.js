import { Router } from 'express';
import {
  getAuthorByIdController,
  getStoriesAuthorsController,
  getStoriesByAuthorIdConntroller,
  getStoriesController,
  getStoryById,
} from '../controllers/stories.js';
import { isValidId } from '../middlewares/isValidId.js';

const storyRouter = Router();

storyRouter.get('/', getStoriesController);

storyRouter.get('/story/:id', isValidId, getStoryById);

storyRouter.get('/byauthor/:id', isValidId, getStoriesByAuthorIdConntroller);

storyRouter.get('/authors', getStoriesAuthorsController);

storyRouter.get('/authors/:id', isValidId, getAuthorByIdController);

export default storyRouter;
