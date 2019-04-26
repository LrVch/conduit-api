import { NextFunction, Request, Response } from 'express';

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body.user;

  res.json({
    user: {
      username: 'user',
      email: email,
      token: 'token'
    }
  });
};
