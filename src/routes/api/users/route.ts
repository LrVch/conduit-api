import express from 'express';

export const getUser = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  res.json({ user: 'Hello user' });
};

export const updateUser = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { email, username, password, image, bio } = req.body.user;
  console.log('username', username);
  console.log('email', email);
  console.log('password', password);
  console.log('image', image);
  console.log('bio', bio);
  res.json({ user: 'User updated' });
};

export const authenticateUser = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { email, password } = req.body.user;
  console.log('email', email);
  console.log('password', password);
  res.json({ user: 'User logged in' });
};

export const createUser = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { username, email, password } = req.body.user;
  console.log('username', username);
  console.log('email', email);
  console.log('password', password);
  res.json({ user: 'User created' });
};
