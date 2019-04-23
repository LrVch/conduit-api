import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { IPayloadRequest, User } from '../../../models';
import { arrayToObjectErrors } from '../../../utils/errors';

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
  const keys = Object.keys(req.body.user);

  try {
    const user = await User.findById((req as IPayloadRequest).payload.id);

    if (!user) {
      return res.sendStatus(404);
    }

    keys.forEach(key => {
      const k = key;
      (user as any)[key] = req.body.user[k];
    });

    try {
      await user.save();
      res.json({ user: user.toAuthJSON() });
    } catch (e) {
      next(e);
    }
  } catch (e) {
    next(e);
  }
};

export const authenticateUser = (
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
      user.token = user.generateJWT();
      return res.json({ user: user.toAuthJSON() });
    } else {
      return res
        .status(422)
        .json({ errors: { 'email or password': 'is invalid' } });
    }
  })(req, res, next);
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, email, password } = req.body.user;
  const user = new User({ username, email, password });

  try {
    await user.save();

    res.json({ user: user.toAuthJSON() });
  } catch (e) {
    next(e);
  }
};
