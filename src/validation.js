import * as Yup from 'yup';
import { EMAIL_REGEX } from '../src/constants/auth.js';

export const registerValidation = Yup.object({
  name: Yup.string()
    .min(2, 'Мінімум 2 символи')
    .max(32, 'Максимум 32 символи')
    .required('Поле «Ім’я та прізвище» є обов’язковим'),
  email: Yup.string()
    .matches(EMAIL_REGEX, 'Введіть коректну електронну адресу')
    .max(64, 'Максимум 64 символи')
    .required('Поле «Email» є обов’язковим'),
  password: Yup.string()
    .min(8, 'Мінімум 8 символів')
    .max(128, 'Максимум 128 символів')
    .required('Поле «Пароль» є обов’язковим'),
});

export const loginValidation = Yup.object({
  email: Yup.string()
    .matches(EMAIL_REGEX, 'Введіть коректну електронну адресу')
    .max(64, 'Максимум 64 символи')
    .required('Поле «Email» є обов’язковим'),
  password: Yup.string()
    .min(8, 'Мінімум 8 символів')
    .max(128, 'Максимум 128 символів')
    .required('Поле «Пароль» є обов’язковим'),
});
