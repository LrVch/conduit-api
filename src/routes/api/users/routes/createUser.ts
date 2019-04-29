import { NextFunction, Request, Response } from 'express';
import UserService from '../../../../services/UserService';

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, email, password } = req.body.user;

  try {
    const user = await UserService.createAndSave({ username, email, password });

    res.json({ user: user.toAuthJSON() });
  } catch (e) {
    return next(e);
  }
};
