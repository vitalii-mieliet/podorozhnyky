import multer from 'multer';
import { TEMP_UPLOAD_DIR } from '../constants/index.js';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, TEMP_UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    const uniquePreffix = Date.now();
    cb(null, `${uniquePreffix}_${file.originalname}`);
  },
});

const limits = {
  fileSize: 1024 * 1024 * 20,
};

const filefilter = (req, file, cb) => {
  const extentions = file.originalname.split('.').pop();
  if (extentions === 'exe') {
    return cb(createHttpError(400, '.exe extention not allow'));
  }
  cb(null, true);
};

export const upload = multer({ storage, limits, filefilter });
