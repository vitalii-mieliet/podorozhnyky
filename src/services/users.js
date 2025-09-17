import { UserCollection } from '../db/models/user.js';

export const getUserInfoService = async (query) => {
  return UserCollection.findOne(query);
};

export const updateUserById = async (userId, data) => {
  const updatedUser = await UserCollection.findByIdAndUpdate(userId, data, {
    new: true,
  });
  return updatedUser;
};
