import { NextFunction, Request, Response } from 'express';
import { IPayloadRequest, User } from '../../../models';

export const getUser = async (
  req: IPayloadRequest,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.payload;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.sendStatus(401);
    }

    return res.json({ user: user.toAuthJSON() });
  } catch (e) {
    next(e);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById((req as IPayloadRequest).payload.id);

    if (!user) {
      return res.sendStatus(404);
    }

    const keys = Object.keys(req.body.user);

    keys.forEach(key => {
      (user as any)[key] = req.body.user[key];
    });

    try {
      await user.save();
      res.json({ user: user.toAuthJSON() });
    } catch (e) {
      return next(e);
    }
  } catch (e) {
    return next(e);
  }
};
