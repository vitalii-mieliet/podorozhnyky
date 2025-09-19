import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { StoriesCollection } from '../db/models/story.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

import {
  AUTHORS_SORT_FILEDS,
  STORY_SORT_FIELDS,
} from '../constants/validation.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilters } from '../utils/parseFiltes.js';
import {
  getStories,
  getStory,
  getAuthors,
  getAuthor,
  getStoriesByAuthorId,
} from '../services/stories.js';

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
    next(error);
  }
};

export const addStoryController = async (req, res, next) => {
  try {
    const { title, article, category } = req.body;
    const { _id } = req.user;
    const photo = req.file;

    if (!photo) throw createHttpError(400, 'Photo is required');

    // upload to Cloudinary
    let photoUrl;
    try {
      photoUrl = await saveFileToCloudinary(photo);
    } catch {
      throw createHttpError(500, 'Failed to upload photo to cloud storage');
    }

    //new Story
    const newStory = await StoriesCollection.create({
      title,
      article,
      category,
      photo: photoUrl,
      ownerId: _id,
    });

    res.status(201).json({
      status: 201,
      message: 'Story successfully created!',
      data: newStory,
    });
  } catch (error) {
    next(error);
  }
};

export const getStoryById = async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
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
    next(error);
  }
};

export const getAuthorByIdController = async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
};

export const getStoriesByAuthorIdConntroller = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { page, perPage } = parsePaginationParams(req.query);

    const data = await getStoriesByAuthorId(id, page, perPage);

    res.json({
      status: 200,
      message: 'Successfully found stories!',
      data,
    });
  } catch (error) {
    next(error);
  }
};
