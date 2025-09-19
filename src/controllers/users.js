import {
  getSavedArticles,
  getUserInfoService,
  saveArticle,
  unsaveArticle,
} from '../services/users.js';

import { updateUserById } from '../services/users.js';

export const onboardingController = async (req, res) => {
  const userId = req.user_id;
  const data = { ...req.body, onboardingCompleted: true };
  const updatedUser = await updateUserById(userId, data);

  res.json({
    status: 200,
    message: 'Onboarding completed',
    user: updatedUser,
  });
};

export const getUserInfoController = async (req, res) => {
  const data = await getUserInfoService(req.user);
  res.json({
    status: 200,
    message: 'User information found',
    data,
  });
};

export const saveUserArticleController = async (req, res) => {
  const storyId = req.params.id;
  const userId = req.user._id;

  await saveArticle(userId, storyId);

  res.json({
    status: 201,
    message: 'Successfully saved article',
    data: {},
  });
};

export const deleteUserArticleController = async (req, res) => {
  const storyId = req.params.id;
  const userId = req.user._id;

  await unsaveArticle(userId, storyId);

  res.json({
    status: 200,
    message: 'Article removed from saved',
    data: {},
  });
};

export const getUserAllSavedArticle = async (req, res) => {
  const userId = req.user._id;
  const savedStories = await getSavedArticles(userId);

  res.json({
    status: 200,
    message: 'Successfully ',
    data: savedStories,
  });
};
