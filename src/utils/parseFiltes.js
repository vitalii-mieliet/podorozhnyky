import createHttpError from 'http-errors';
import { STORY_CATEGORIES } from '../constants/validation.js';

const parseCategory = (category) => {
  if (typeof type !== 'string') return;
  if (!STORY_CATEGORIES.includes(category)) {
    throw createHttpError(404, `Not found in this category: ${category}`);
  }
  return category;
};

export const parseFilters = ({ category }) => {
  const parsedCategory = parseCategory(category);
  return { category: parsedCategory };
};
