import createHttpError from 'http-errors';
import multer from 'multer';
import { TEMP_UPLOAD_DIR } from '../constants/index.js';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, TEMP_UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, `${uniqueSuffix}_${file.originalname}`);
  },
});

const limits = {
  fileSize: 1024 * 1024 * 20,
};

const fileFilter = (req, file, cb) => {
  const extentions = file.originalname.split('.').pop();
  if (extentions === 'exe') {
    return cb(createHttpError(400, '.exe extention not allow'));
  }
  cb(null, true);
};

export const upload = multer({ storage, limits, fileFilter });

// аплоад для аватарів
const allowedImageTypes = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
]);

const avatarFileFilter = (_req, file, cb) => {
  if (!allowedImageTypes.has(file.mimetype)) {
    return cb(
      createHttpError(400, 'Unsupported file type (only JPG, PNG, WEBP, GIF)'),
      false,
    );
  }
  cb(null, true);
};

export const avatarUpload = multer({
  storage,
  fileFilter: avatarFileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});
