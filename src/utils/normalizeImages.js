import sharp from 'sharp';
import path from 'path';
import { TEMP_UPLOAD_DIR } from '../constants/index.js';
import { slugifyFileName } from './slugifyFileName.js';

export const normalizeImages = async (file) => {
  const originalName = path.parse(file.originalname).name;
  const safeName = slugifyFileName(originalName);
  const webpFileName = `${safeName}.webp`;
  const webpFilePath = path.join(TEMP_UPLOAD_DIR, webpFileName);

  await sharp(file.path).webp({ quality: 80 }).toFile(webpFilePath);

  return {
    path: webpFilePath,
    filename: webpFileName,
  };
};
