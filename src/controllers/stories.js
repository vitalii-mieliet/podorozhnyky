import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import {
  getStories,
  getStory,
  getAuthors,
  getAuthor,
  getStoriesByAuthorId,
} from '../services/stories.js';
import {
  AUTHORS_SORT_FILEDS,
  STORY_SORT_FIELDS,
} from '../constants/validation.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilters } from '../utils/parseFiltes.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { StoriesCollection } from '../db/models/story.js';

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
  const { title, article, category } = req.body;
  const { _id } = req.user;
  const photo = req.file;
  let photoUrl;

  if (photo)
    try {
      photoUrl = await saveFileToCloudinary(photo);
    } catch {
      throw createHttpError(500, 'Failed to upload photo to cloud storage');
    }

  // upload to Cloudinary

  //new Story
  const newStory = await StoriesCollection.create({
    title,
    article,
    category,
    img: photoUrl,
    ownerId: _id,
  });

  res.status(201).json({
    status: 201,
    message: 'Story successfully created!',
    data: newStory,
  });
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

export const getStoriesByAuthorIdConntroller = async (req, res) => {
  const { id } = req.params;
  const { page, perPage } = parsePaginationParams(req.query);

  const data = await getStoriesByAuthorId(id, page, perPage);

  res.json({
    status: 200,
    message: 'Successfully found stories!',
    data,
  });
};
