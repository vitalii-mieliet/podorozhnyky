import Joi from 'joi';
import { STORY_CATEGORIES } from '../constants/validation.js';

export const createStorySchema = Joi.object({
  title: Joi.string().min(3).max(128).required(),
  article: Joi.string().allow('').required(),
  fullText: Joi.string().allow('').required(),
  category: Joi.string()
    .valid(...STORY_CATEGORIES)
    .required(),
});

export const updateStoriesSchema = Joi.object({
  title: Joi.string().min(3).max(128),
  article: Joi.string().allow(''),
  fullText: Joi.string().allow(''),
  category: Joi.string().valid(...STORY_CATEGORIES),
});
