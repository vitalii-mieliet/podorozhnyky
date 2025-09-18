import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import {
  AUTHORS_SORT_FILEDS,
  STORY_SORT_FIELDS,
} from '../constants/validation.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilters } from '../utils/parseFiltes.js';
import { getAuthors, getStories } from '../services/stories.js';

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

export const getStoriesAuthorsController = async (req, res, next) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query, AUTHORS_SORT_FILEDS);
  try {
    const data = await getAuthors(page, perPage, sortBy, sortOrder);

    res.json({
      status: 200,
      message: 'Successfully found authors!',
      data,
    });
  } catch (error) {
    next(err);
  }
};
