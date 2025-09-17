import { logoutUser } from '../services/auth.js';
import * as authService from '../services/auth.js';

const register = async (req, res, next) => {
  try {
    const newUser = await authService.register(req.body);

    res.status(201).json({
      status: 201,
      message: 'Successfully registered a user!',
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    next(error);
  }
};

export default {
  register,
};

export const logoutUserController = async (req, res) => {
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};
