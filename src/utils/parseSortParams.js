import { STORY_SORT_FIELDS } from '../constants/validation.js';
const sortOrderList = ['asc', 'desc'];

export const parseSortParams = ({ sortBy, sortOrder }, sortFields) => {
  const parsedSortBy = sortFields.includes(sortBy)
    ? sortBy
    : STORY_SORT_FIELDS[0];
  const parsedSortOrder = sortOrderList.includes(sortOrder)
    ? sortOrder
    : sortOrderList[1];

  return {
    sortBy: parsedSortBy,
    sortOrder: parsedSortOrder,
  };
};
