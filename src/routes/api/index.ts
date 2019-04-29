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
    next(err);
  }
);

router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({
      errors: {
        jwt: err.message
      }
    });
  }
});

export default router;
