import { NextFunction, Request, Response } from 'express';
import { IPayloadRequest } from '../../../../models';
import UserService from '../../../../services/UserService';

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await UserService.findById(
      (req as IPayloadRequest).payload.id
    );

    if (!user) {
      return res.sendStatus(404);
    }

    const keys = Object.keys(req.body.user);

    keys.forEach(key => {
      (user as any)[key] = req.body.user[key];
    });

    try {
      await user.save();
      return res.json({ user: user.toAuthJSON() });
    } catch (e) {
      return next(e);
    }
  } catch (e) {
    return next(e);
  }
};
