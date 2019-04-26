import express, { NextFunction, Request, Response } from 'express';
import { IValidationError } from '../../models';
import { formatValidationErrors } from '../../utils';
import users from './users';

const router = express.Router();

router.use('/', users);

router.use(
  (err: IValidationError, req: Request, res: Response, next: NextFunction) => {
    if (err.name === 'ValidationError') {
      return res.status(422).json(formatValidationErrors(err.errors));
    }
  }
);

export default router;
