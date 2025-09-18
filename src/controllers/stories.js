import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { getStories } from '../services/stories.js';
import { StoriesCollection } from '../db/models/story.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

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
    console.log(_id);

    const photo = req.file;

    //validation
    if (!title) return res.status(400).json({ message: 'title is required' });

    if (!article || article.length < 20)
      return res
        .status(400)
        .json({ message: 'Article must be at list 20 characters' });

    if (!photo) return res.status(400).json({ message: 'Photo is required' });

    // upload to Cloudinary
    let photoUrl;
    try {
      photoUrl = await saveFileToCloudinary(photo);
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Failed to upload photo to cloud storage' });
    }

    //new Story
    const newStory = await StoriesCollection.create({
      title,
      article,
      category,
      photo: photoUrl,
      ownerId: _id,
    });

    res.status(201).json(newStory);
  } catch (error) {
    next(error);
  }
};
