import Joi from 'joi';
import { STORY_CATEGORIES } from '../constants/validation.js';

export const createStorySchema = Joi.object({
  img: Joi.string().uri().allow(''),
  title: Joi.string().min(3).max(128).required(),
  article: Joi.string().allow(''),
  category: Joi.string()
    .valid(...STORY_CATEGORIES)
    .required(),
});

export const updateStoriesSchema = Joi.object({
  img: Joi.string().uri().allow(''),
  title: Joi.string().min(3).max(128).required(),
  article: Joi.string().allow(''),
  category: Joi.string()
    .valid(...STORY_CATEGORIES)
    .required(),
});
