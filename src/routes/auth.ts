import { Request } from 'express';
import jwt from 'express-jwt';
import config from '../config';
const secret = config.get('jwt:secret');

export const getToken = (req: Request) => {
  const [header = '', token = ''] = req.headers.authorization
    ? req.headers.authorization.split(' ')
    : [];

  if (header && token && (header === 'Token' || header === 'Bearer')) {
    return token;
  }

  return null;
};

const auth = {
  required: jwt({
    secret,
    userProperty: 'payload',
    getToken
  }),
  optional: jwt({
    secret,
    userProperty: 'payload',
    credentialsRequired: false,
    getToken
  })
};

export default auth;
