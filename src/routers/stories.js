import { Router } from 'express';
import {
  addStoryController,
  getAuthorByIdController,
  getStoriesAuthorsController,
  getStoriesByAuthorIdConntroller,
  getStoriesController,
  getStoryById,
} from '../controllers/stories.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { upload } from '../middlewares/multer.js';
import { authenticate } from '../middlewares/authenticate.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createStorySchema } from '../validation/stories.js';
import { isValidId } from '../middlewares/isValidId.js';

const storyRouter = Router();

storyRouter.get('/', ctrlWrapper(getStoriesController));

storyRouter.post(
  '/',
  authenticate,
  upload.single('photo'),
  validateBody(createStorySchema),
  ctrlWrapper(addStoryController),
);

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
