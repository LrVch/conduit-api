import { NextFunction, Response } from 'express';
import { IPayloadRequest } from '../../../../models';
import UserService from '../../../../services/UserService';

export const getUser = async (
  req: IPayloadRequest,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.payload;

  try {
    const user = await UserService.findById(id);

    if (!user) {
      return res.sendStatus(401);
    }

    return res.json({ user: user.toAuthJSON() });
  } catch (e) {
    return next(e);
  }
};
