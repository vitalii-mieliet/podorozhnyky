import { Router } from 'express';
import {
  addStoryController,
  getAuthorByIdController,
  getStoriesAuthorsController,
  getStoriesByAuthorIdConntroller,
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

storyRouter.get('/story/:id', isValidId, getStoryById);

storyRouter.get('/byauthor/:id', isValidId, getStoriesByAuthorIdConntroller);

storyRouter.get('/authors', getStoriesAuthorsController);

storyRouter.get('/authors/:id', isValidId, getAuthorByIdController);

export default storyRouter;
