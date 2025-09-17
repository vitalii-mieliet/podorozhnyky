//---------------------------------------------------------------

import { updateUserById } from '../services/users.js';

export const onboardingController = async (req, res) => {
  const userId = req.user_id;
  const data = { ...req.body, onboardingCompleted: true };
  const updatedUser = await updateUserById(userId, data);

  res.json({
    status: 200,
    user: updatedUser,
  });
};
