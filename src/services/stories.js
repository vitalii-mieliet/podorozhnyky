import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { StoriesCollection } from '../db/models/story.js';
import { UserCollection } from '../db/models/user.js';

export const getStories = async (
  page = 1,
  perPage = 10,
  sortBy = 'rate',
  sortOrder = 'desc',
  filters = {},
) => {
  const skip = (page - 1) * perPage;

  const storiesQuery = StoriesCollection.find();

  if (filters.category) {
    storiesQuery.where('category').equals(filters.category);
  }

  storiesQuery.populate({
    path: 'ownerId',
    select: 'name avatar',
  });

  const [storiesCount, stories] = await Promise.all([
    StoriesCollection.find().merge(storiesQuery).countDocuments(),

    storiesQuery
      .skip(skip)
      .limit(perPage)
      .sort({ [sortBy]: sortOrder }),
  ]);

  const modifiedStories = stories.map((story) => {
    const obj = story.toObject();
    obj.owner = obj.ownerId;
    delete obj.ownerId;
    return obj;
  });

  const paginationData = calculatePaginationData(storiesCount, perPage, page);

  return { data: modifiedStories, ...paginationData };
};

export const getStory = async (id) => {
  return StoriesCollection.findById(id);
};

export const getAuthors = async (
  page = 1,
  perPage = 10,
  sortBy = 'name',
  sortOrder = 'asc',
) => {
  const skip = (page - 1) * perPage;

  const authorsQuery = await UserCollection.find({}, 'name avatar')
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder });

  const authorsCount = await UserCollection.countDocuments();
  const authors = await authorsQuery;

  const paginationData = calculatePaginationData(authorsCount, perPage, page);

  return { data: authors, ...paginationData };
};

export const getAuthor = async (id) => {
  return UserCollection.findById(id, 'name avatar');
};

export const getStoriesByAuthorId = async (ownerId, page = 1, perPage = 10) => {
  const skip = (page - 1) * perPage;

  const storiesQuery = StoriesCollection.find({ ownerId });

  storiesQuery.populate({
    path: 'ownerId',
    select: 'name avatar',
  });

  const [storiesCount, stories] = await Promise.all([
    StoriesCollection.find({ ownerId }).countDocuments(),
    storiesQuery.skip(skip).limit(perPage),
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
