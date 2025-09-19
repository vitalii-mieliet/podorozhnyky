import createHttpError from 'http-errors';
import { StoriesCollection } from '../db/models/story.js';
import { UserCollection } from '../db/models/user.js';
import { SavedArticleCollection } from '../db/models/savedArticle.js';

export const getUserInfoService = async (query) => {
  return UserCollection.findOne(query);
};

export const updateUserById = async (userId, data) => {
  const updatedUser = await UserCollection.findByIdAndUpdate(userId, data, {
    new: true,
  });
  return updatedUser;
};

export const saveArticle = async (userId, storyId) => {
  const story = await StoriesCollection.findById(storyId);

  if (!story) {
    throw createHttpError(404, 'Story not found');
  }

  const alreadySaved = await SavedArticleCollection.findOne({
    userId,
    storyId,
  });
  if (alreadySaved) {
    throw createHttpError(409, 'Story already saved by this user');
  }

  await SavedArticleCollection.create({ userId, storyId });

  await UserCollection.findByIdAndUpdate(userId, {
    $addToSet: { savedStories: storyId },
  });

  await StoriesCollection.findByIdAndUpdate(
    storyId,
    { $inc: { rate: 1 } },
    { new: true },
  );
};

export const unsaveArticle = async (userId, storyId) => {
  const saved = await SavedArticleCollection.findOne({ userId, storyId });

  if (!saved) {
    throw createHttpError(404, 'Story is not saved by this user');
  }

  await SavedArticleCollection.deleteOne({ userId, storyId });

  await UserCollection.findByIdAndUpdate(userId, {
    $pull: { savedStories: storyId },
  });

  await StoriesCollection.findByIdAndUpdate(
    storyId,
    { $inc: { rate: -1 } },
    { new: true },
  );
};

export const getSavedArticles = async (userId) => {
  const user = await UserCollection.findById(userId).populate('savedStories');
  if (!user) throw createHttpError(404, 'User not found');

  return user.savedStories;
};
