import { NextFunction, Request, Response } from 'express';
import { IPayloadRequest } from '../../../../../models';

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = (req as IPayloadRequest).payload.id;

  if (id === 'validId') {
    return res.json({
      user: {
        username: 'new name',
        email: 'new email',
        token: 'token'
      }
    });
  }
};
