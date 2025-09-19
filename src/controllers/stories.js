import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { getStories } from '../services/stories.js';
import { StoriesCollection } from '../db/models/story.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import createHttpError from 'http-errors';

export const getStoriesController = async (req, res, next) => {
  const { page, perPage } = parsePaginationParams(req.query);

  try {
    const data = await getStories({ page, perPage });

    res.json({
      status: 200,
      message: 'Successfully found stories!',
      data,
    });
  } catch (error) {
    next(error);
  }
};

//---------------------------------------------------------------

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
