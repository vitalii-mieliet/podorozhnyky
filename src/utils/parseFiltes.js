import { STORY_CATEGORIES } from '../constants/validation.js';

const parseCategory = (category) => {
  if (typeof category !== 'string') return;
  const isCategory = (category) => STORY_CATEGORIES.includes(category);
  if (isCategory(category)) return category;
};

export const parseFilters = ({ category }) => {
  const parsedCategory = parseCategory(category);
  return { category: parsedCategory };
};
