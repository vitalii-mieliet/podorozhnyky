import { getUserInfoService } from '../services/users.js';

export const getUserInfoController = async (req, res, next) => {
  try {
    const data = await getUserInfoService(req.user);

    res.json({
      status: 200,
      message: 'Find information about user!',
      data,
    });
  } catch (error) {
    next(err);
  }
};
