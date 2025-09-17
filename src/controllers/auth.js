import * as authService from '../services/auth.js';

const register = async (req, res, next) => {
  try {
    const newUser = await authService.register(req.body);

    res.status(201).json({
      status: 'success',
      code: 201,
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