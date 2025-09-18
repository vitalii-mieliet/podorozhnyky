import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { STORY_SORT_FIELDS } from '../constants/validation.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilters } from '../utils/parseFiltes.js';
import { getStories } from '../services/stories.js';

export const getStoriesController = async (req, res, next) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query, STORY_SORT_FIELDS);
  const filters = parseFilters(req.query);

  try {
    const data = await getStories(page, perPage, sortBy, sortOrder, filters);

    res.json({
      status: 200,
      message: 'Successfully found stories!',
      data,
    });
  } catch (error) {
    next(err);
  }
};
