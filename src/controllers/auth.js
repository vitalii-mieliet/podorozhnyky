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