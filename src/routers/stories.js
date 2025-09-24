import { Router } from 'express';
import {
  addStoryController,
  deleteStoryByIdController,
  getAuthorByIdController,
  getCategoriesController,
  getStoriesAuthorsController,
  getStoriesByAuthorIdController,
  getStoriesController,
  getStoryById,
} from '../controllers/stories.js';
import { createStorySchema } from '../validation/stories.js';
import { validateBody } from '../middlewares/validateBody.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';
import { isValidId } from '../middlewares/isValidId.js';

const storyRouter = Router();

storyRouter.get('/', getStoriesController);

storyRouter.get('/story/:id', isValidId, getStoryById);

storyRouter.post(
  '/',
  authenticate,
  upload.single('photo'),
  validateBody(createStorySchema),
  addStoryController,
);

storyRouter.delete('/:id', authenticate, isValidId, deleteStoryByIdController);

storyRouter.get('/story/:id', isValidId, getStoryById);

storyRouter.get('/byauthor/:id', isValidId, getStoriesByAuthorIdController);

storyRouter.get('/authors', getStoriesAuthorsController);

storyRouter.get('/authors/:id', isValidId, getAuthorByIdController);

storyRouter.get('/category', getCategoriesController);

export default storyRouter;
