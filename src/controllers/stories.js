import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import {
  getStories,
  getStory,
  getAuthors,
  getAuthor,
  getStoriesByAuthorId,
  addStory,
  deleteStoryById,
  updateStories,
} from '../services/stories.js';
import {
  AUTHORS_SORT_FILEDS,
  STORIES_SORT_FIELDS,
  STORY_CATEGORIES,
} from '../constants/validation.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilters } from '../utils/parseFiltes.js';
import { StoriesCollection } from '../db/models/story.js';

export const getStoriesController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(
    req.query,
    STORIES_SORT_FIELDS,
    STORIES_SORT_FIELDS[0],
  );
  const filters = parseFilters(req.query);

  const data = await getStories(page, perPage, sortBy, sortOrder, filters);

  res.json({
    status: 200,
    message: 'Successfully found stories!',
    data,
  });
};

export const addStoryController = async (req, res) => {
  const { _id: ownerId } = req.user;

  const data = await addStory({ ...req.body, ownerId }, req.file);

  res.status(201).json({
    status: 201,
    message: 'Story successfully created!',
    data,
  });
};

export const deleteStoryByIdController = async (req, res) => {
  const { id } = req.params;

  const data = await deleteStoryById(id);
  if (!data) {
    throw createHttpError(404, 'Story not found');
  }

  res.status(204).send();
};

export const getStoryById = async (req, res) => {
  const { id } = req.params;

  const data = await getStory(id);

  if (!data) {
    throw createHttpError(404, 'Story not found');
  }

  res.json({
    status: 200,
    message: 'Successfully found story!',
    data,
  });
};

export const getStoriesAuthorsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(
    req.query,
    AUTHORS_SORT_FILEDS,
    AUTHORS_SORT_FILEDS[0],
  );

  const data = await getAuthors(page, perPage, sortBy, sortOrder);

  res.json({
    status: 200,
    message: 'Successfully found authors!',
    data,
  });
};

export const getAuthorByIdController = async (req, res) => {
  const { id } = req.params;

  const data = await getAuthor(id);

  if (!data) {
    throw createHttpError(404, 'User not found');
  }

  res.json({
    status: 200,
    message: 'Successfully found author!',
    data,
  });
};

export const getStoriesByAuthorIdController = async (req, res) => {
  const { id } = req.params;
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(
    req.query,
    STORIES_SORT_FIELDS,
    STORIES_SORT_FIELDS[0],
  );

  const data = await getStoriesByAuthorId(id, page, perPage, sortBy, sortOrder);

  res.json({
    status: 200,
    message: 'Successfully found stories!',
    data,
  });
};

export const getCategoriesController = async (req, res) => {
  const category = await STORY_CATEGORIES;

  res.json({
    status: 200,
    message: 'Successfully!',
    data: category,
  });
};

export const storyEditController = async (req, res) => {
  const { id: storyId } = req.params;
  const userId = req.user._id;
  const payload = req.body;
  const photo = req.file;

  const newData = await updateStories(storyId, userId, payload, photo);

  res.json({
    status: 200,
    message: 'Successfully updated story!',
    data: newData,
  });
};
