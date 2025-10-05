import {
  getSavedArticles,
  getUserInfoService,
  saveArticle,
  unsaveArticle,
  updateUserAvatarService,
  updateUserById,
} from '../services/users.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { getStoriesByAuthorId } from '../services/stories.js';
import { STORIES_SORT_FIELDS } from '../constants/validation.js';
import { parseSortParams } from '../utils/parseSortParams.js';

export const onboardingController = async (req, res) => {
  const photo = req.file;
  const userId = req.user._id;

  const data = { onboardingCompleted: true };
  if (req.body.bio) data.bio = req.body.bio;

  const updatedUser = await updateUserById(userId, data, photo);

  res.json({
    status: 200,
    message: 'Onboarding completed!',
    user: updatedUser,
  });
};

export const getUserInfoController = async (req, res) => {
  const userId = req.user._id;
  const data = await getUserInfoService(userId);
  res.json({
    status: 200,
    message: 'User information found!',
    data,
  });
};

export const saveUserArticleController = async (req, res) => {
  const storyId = req.params.id;
  const userId = req.user._id;

  await saveArticle(userId, storyId);

  res.json({
    status: 201,
    message: 'Successfully saved article!',
    data: {},
  });
};

export const deleteUserArticleController = async (req, res) => {
  const storyId = req.params.id;
  const userId = req.user._id;

  await unsaveArticle(userId, storyId);

  res.json({
    status: 200,
    message: 'Article removed from saved!',
    data: {},
  });
};

export const getUserAllSavedArticle = async (req, res) => {
  const userId = req.user._id;
  const { sortBy, sortOrder } = parseSortParams(
    req.query,
    STORIES_SORT_FIELDS,
    STORIES_SORT_FIELDS[0],
  );
  const { page, perPage } = parsePaginationParams(req.query);

  const savedStories = await getSavedArticles(
    userId,
    page,
    perPage,
    sortBy,
    sortOrder,
  );

  res.json({
    status: 200,
    message: 'Successfully found saved stories!',
    data: savedStories,
  });
};

export const getUserCreatedStoriesController = async (req, res) => {
  const userId = req.user._id;

  const { sortBy, sortOrder } = parseSortParams(
    req.query,
    STORIES_SORT_FIELDS,
    STORIES_SORT_FIELDS[0],
  );
  const { page, perPage } = parsePaginationParams(req.query);

  const data = await getStoriesByAuthorId(
    userId,
    page,
    perPage,
    sortBy,
    sortOrder,
  );

  res.json({
    status: 200,
    message: 'Successfully found stories!',
    data,
  });
};

export const updateAvatarController = async (req, res) => {
  const userId = req.user._id;

  const updatedUser = await updateUserAvatarService(userId, req.file);

  res.json({
    status: 200,
    message: 'Avatar updated!',
    user: updatedUser,
  });
};
