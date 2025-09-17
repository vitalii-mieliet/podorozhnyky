import Joi from 'joi';

export const registerUserSchema = Joi.object({
  name: Joi.string().min(2).max(32).required(),
  email: Joi.string().email().max(64).required(),
  password: Joi.string().min(8).max(128).required(),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().email().max(64).required(),
  password: Joi.string().min(8).max(128).required(),
});

export const requestResetEmailSchema = Joi.object({
  email: Joi.string().email().max(64).required(),
});

export const resetPassword = Joi.object({
  password: Joi.string().min(8).max(128).required(),
  token: Joi.string().required(),
});

export const loginWithGoogleOAuthSchema = Joi.object({
  code: Joi.string().required(),
});

export const onboardingCompletedSchema = Joi.object({
  avatar: Joi.string(),
  bio: Joi.string().min(0).max(256),
});
