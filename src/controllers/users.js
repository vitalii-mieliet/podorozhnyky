import { getUserInfoService } from '../services/users.js';

export const getUserInfoController = async (req, res, next) => {
  try {
    const data = await getUserInfoService(req.user);

    res.json({
      status: 200,
      message: 'User information found',
      data,
    });
  } catch (error) {
    next(error);
  }
};
