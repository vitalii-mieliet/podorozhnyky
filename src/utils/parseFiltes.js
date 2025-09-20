import createHttpError from 'http-errors';
import { STORY_CATEGORIES } from '../constants/validation.js';

const parseCategory = (category) => {
  if (typeof category !== 'string') {
    throw createHttpError(400, 'Category must be a string');
  }
  if (!STORY_CATEGORIES.includes(category)) {
    throw createHttpError(404, `Not found in this category: ${category}`);
  }
  return category;
};

export const parseFilters = ({ category }) => {
  const parsedCategory = parseCategory(category);
  return { category: parsedCategory };
};
