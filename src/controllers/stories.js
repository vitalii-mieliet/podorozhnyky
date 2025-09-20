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
} from '../services/stories.js';
import {
  AUTHORS_SORT_FILEDS,
  STORY_SORT_FIELDS,
} from '../constants/validation.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilters } from '../utils/parseFiltes.js';

export const getStoriesController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query, STORY_SORT_FIELDS);
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
  const { sortBy, sortOrder } = parseSortParams(req.query, AUTHORS_SORT_FILEDS);

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
  const { sortBy, sortOrder } = parseSortParams(req.query, STORY_SORT_FIELDS);

  const data = await getStoriesByAuthorId(id, page, perPage, sortBy, sortOrder);

  res.json({
    status: 200,
    message: 'Successfully found stories!',
    data,
  });
};
