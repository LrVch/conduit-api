import { NextFunction, Response } from 'express';
import { IPayloadRequest } from '../../../../../models';

export const getUser = async (
  req: IPayloadRequest,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.payload;

  const user = {
    username: 'username',
    email: 'email',
    token: 'token'
  };

  if (id === 'unknownuser') {
    return res.sendStatus(404);
  }

  return res.json({ user });
};
