import { v2 as cloudinary } from 'cloudinary';
import fs from 'node:fs/promises';
import { normalizeImages } from './normalizeImages.js';
import { CLOUDINARY } from '../constants/index.js';
import { getEnvVar } from './getEnvVar.js';

cloudinary.config({
  secure: true,
  cloud_name: getEnvVar(CLOUDINARY.CLOUD_NAME),
  api_key: getEnvVar(CLOUDINARY.API_KEY),
  api_secret: getEnvVar(CLOUDINARY.API_SECRET),
});

export const saveFileToCloudinary = async (file) => {
  const normalized = await normalizeImages(file);

  const response = await cloudinary.uploader.upload(normalized.path, {
    folder: 'images',
    use_filename: true,
    filename_override: normalized.filename,
  });

  await fs.unlink(file.path);
  await fs.unlink(normalized.path);

  return response.secure_url;
};
