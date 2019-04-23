import { NextFunction, Request, Response } from 'express';
import { IValidationError } from '../models';

export default function(
  err: IValidationError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err.name === 'ValidationError') {
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce(
        (errors: { [key: string]: any }, key: any) => {
          errors[key] = err.errors[key].message;

          return errors;
        },
        {}
      )
    });
  }

  return next(err);
}
