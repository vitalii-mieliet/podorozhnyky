import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';

import { SessionsCollection } from '../db/models/session.js';
import { UserCollection as User } from '../db/models/user.js';

export const register = async (data) => {
  const { email, password } = data;

  // перевірка унікальності ел пошти
  const user = await User.findOne({ email });
  if (user) {
    throw createHttpError(409, 'Email already in use');
  }

  // хешування паролю
  const hashPassword = await bcrypt.hash(password, 10);

  // створення нового юзера
  const newUser = await User.create({ ...data, password: hashPassword });

  // повертаємо дані без пароля
  return {
    name: newUser.name,
    email: newUser.email,
  };
};

export const logoutUser = (sessionId) => {
  SessionsCollection.findOneAndDelete({ _id: sessionId });
};
