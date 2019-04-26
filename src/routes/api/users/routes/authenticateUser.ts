import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { arrayToObjectErrors } from '../../../../utils/errors';

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body.user;
  const errors = [];

  if (!email) {
    errors.push({ email: "can't be blank" });
  }

  if (!password) {
    errors.push({ password: "can't be blank" });
  }

  if (errors.length) {
    return res.status(422).json(arrayToObjectErrors(errors));
  }

  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (user) {
      return res.json({ user: user.toAuthJSON() });
    } else {
      return res
        .status(422)
        .json({ errors: { 'email or password': 'is invalid' } });
    }
  })(req, res, next);
};
