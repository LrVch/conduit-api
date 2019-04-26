import { NextFunction, Request, Response } from 'express';

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, email, password } = req.body.user;

  if (username === 'jake') {
    const user = {
      toAuthJSON() {
        return {
          username,
          email,
          token: 'token',
          bio: 'bio',
          image: 'image'
        };
      }
    };

    return res.json({ user: user.toAuthJSON() });
  }

  if (username === 'takenUsername') {
    const errors = {
      username: {
        message: 'is already taken.'
      }
    };
    const error = { errors, name: 'ValidationError' };
    return next(error);
  }

  if (email === 'takenEmail') {
    const errors = {
      email: {
        message: 'is already taken.'
      }
    };
    const error = { errors, name: 'ValidationError' };
    return next(error);
  }

  if (!username && !email && !password) {
    const errors = {
      username: {
        message: "can't be blank."
      },
      email: {
        message: "can't be blank."
      },
      password: {
        message: "can't be blank."
      }
    };
    const error = { errors, name: 'ValidationError' };
    return next(error);
  }
};
