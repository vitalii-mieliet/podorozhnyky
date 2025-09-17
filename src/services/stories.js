import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { StoriesCollection } from '../db/models/story.js';

export const getStories = async ({ page = 1, perPage = 10 }) => {
  const skip = (page - 1) * perPage;

  const storiesQuery = StoriesCollection.find();

  const [storiesCount, stories] = await Promise.all([
    StoriesCollection.find().merge(storiesQuery).countDocuments(),

    storiesQuery.skip(skip).limit(perPage),
  ]);

  const paginationData = calculatePaginationData(storiesCount, perPage, page);

  return { data: stories, ...paginationData };
};
