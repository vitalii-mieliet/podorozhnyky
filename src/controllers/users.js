import { getUserInfoService } from '../services/users.js';

export const getUserInfoController = async (req, res) => {
  const data = await getUserInfoService(req.user);
  res.json({
    status: 200,
    message: 'User information found',
    data,
  });
};
