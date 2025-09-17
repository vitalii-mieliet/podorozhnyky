import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { getStories } from '../services/stories.js';

export const getStoriesController = async (req, res, next) => {
  const { page, perPage } = parsePaginationParams(req.query);

  try {
    const data = await getStories({ page, perPage });

    res.json({
      status: 200,
      message: 'Successfully found stories!',
      data,
    });
  } catch (error) {
    next(err);
  }
};
