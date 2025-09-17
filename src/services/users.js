import { UserCollection } from '../db/models/user.js';

export const getUserInfoService = async (query) => {
  return UserCollection.findOne(query);
};
