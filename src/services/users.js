import createHttpError from 'http-errors';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SavedArticleCollection } from '../db/models/savedArticle.js';
import { StoriesCollection } from '../db/models/story.js';
import { UserCollection } from '../db/models/user.js';

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

export const getSavedArticles = async (
  userId,
  page = 1,
  perPage = 10,
  sortBy,
  sortOrder,
) => {
  const skip = (page - 1) * perPage;

  const storiesCount = await UserCollection.findById(userId)
    .select('savedStories')
    .lean()
    .then((user) => {
      if (!user) throw createHttpError(404, 'User not found');
      return user.savedStories.length;
    });

  const user = await UserCollection.findById(userId).populate({
    path: 'savedStories',
    options: { skip, limit: perPage, sort: { [sortBy]: sortOrder } },
    populate: {
      path: 'ownerId',
      select: 'name avatar bio',
    },
  });

  const stories = user.savedStories;
  const paginationData = calculatePaginationData(storiesCount, perPage, page);

  if (stories.length === 0) {
    throw createHttpError(404, 'Stories not found');
  }

  const modifiedStories = stories.map((story) => {
    const obj = story.toObject();
    obj.owner = obj.ownerId;
    delete obj.ownerId;
    return obj;
  });

  return { data: modifiedStories, ...paginationData };
};
