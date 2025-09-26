import * as Yup from 'yup';

export const MAX_BIO = 150;
const MAX_FILE_MB = 5;
const SUPPORTED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

export const onboardingSchema = Yup.object({
  bio: Yup.string().trim().max(MAX_BIO, `Не більше ${MAX_BIO} символів`),
  avatarFile: Yup.mixed()
    .test('fileSize', `Фото має бути ≤ ${MAX_FILE_MB}MB`, (file) => {
      if (!file) return true;
      return file.size <= MAX_FILE_MB * 1024 * 1024;
    })
    .test('fileType', 'Підтримуються лише JPG/PNG/WEBP/GIF', (file) => {
      if (!file) return true;
      return SUPPORTED_TYPES.includes(file.type);
    }),
});
