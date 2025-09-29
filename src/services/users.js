import fs from 'node:fs/promises';
import createHttpError from 'http-errors';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SavedArticleCollection } from '../db/models/savedArticle.js';
import { StoriesCollection } from '../db/models/story.js';
import { UserCollection } from '../db/models/user.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const getUserInfoService = async (query) => {
  return await UserCollection.findOne(query);
};

export const updateUserById = async (userId, data, photo) => {
  let photoUrl = null;

  if (photo)
    try {
      photoUrl = await saveFileToCloudinary(photo);
    } catch {
      throw createHttpError(500, 'Failed to upload photo to cloud storage');
    }

  const updatedUser = await UserCollection.findByIdAndUpdate(
    userId,
    { ...data, avatar: photoUrl },
    { new: true },
  );

  return updatedUser;
};

export const saveArticle = async (userId, storyId) => {
  const story = await StoriesCollection.findById(storyId);

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

  const user = await UserCollection.findById(userId)
    .select('savedStories')
    .lean();
  if (!user) throw createHttpError(404, 'User not found');

  const savedIds = user.savedStories || [];

  const storiesQuery = StoriesCollection.find({ _id: { $in: savedIds } })
    .sort({ [sortBy]: sortOrder })
    .skip(skip)
    .limit(perPage)
    .populate('ownerId', 'name avatar bio');

  const [stories, storiesCount] = await Promise.all([
    storiesQuery,
    StoriesCollection.countDocuments({ _id: { $in: savedIds } }),
  ]);

  const paginationData = calculatePaginationData(storiesCount, perPage, page);

  const modifiedStories = stories.map((story) => {
    const obj = story.toObject();
    obj.owner = obj.ownerId;
    delete obj.ownerId;
    return obj;
  });

  return { data: modifiedStories, ...paginationData };
};

export const updateUserAvatarService = async (userId, file) => {
  if (!userId) {
    throw createHttpError(401, 'Unauthorized');
  }
  if (!file) {
    throw createHttpError(400, 'Avatar file is required');
  }

  const localPath = file.path;

  // Завантажуємо на Cloudinary
  const { secure_url } = await saveFileToCloudinary(localPath, {
    folder: 'avatars',
    // за бажанням:
    // transformation: [{ width: 320, height: 320, crop: 'fill', gravity: 'face' }],
  });

  // Прибираємо тимчасовий файл
  await fs.unlink(localPath).catch(() => {});

  // Оновлюємо юзера по полю "avatar" у схемі
  const updatedUser = await updateUserById(userId, { avatar: secure_url });

  return updatedUser;
};
