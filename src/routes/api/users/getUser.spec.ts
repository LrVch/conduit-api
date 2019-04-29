import * as jwt from 'jsonwebtoken';
import supertest from 'supertest';
import app from '../../../app';
import config from '../../../config';
jest.mock('./routes/getUser');

const secret = config.get('jwt:secret');

const getToken = (id: string) =>
  jwt.sign(
    {
      id,
      username: 'username'
    },
    secret
  );

const url = '/api/v1/user';

describe('API', () => {
  describe(`GET ${url}`, () => {
    test('It should return user', async () => {
      const response: any = await supertest(app)
        .get(url)
        .set('Authorization', `Bearer ${getToken('validId')}`)
        .set('Accept', 'application/json');

      const { headers, statusCode, text, body, contentType } = response;
      const { username, token, email } = body.user;

      expect(statusCode).toBe(200);
      expect(username).toBe('username');
      expect(email).toBe('email');
      expect(token).toBe('token');
    });

    test("It should return status 401 if token isn't valid", async () => {
      const response: any = await supertest(app)
        .get(url)
        .set('Accept', 'application/json');

      const { statusCode, body } = response;
      const { errors } = body;

      expect(statusCode).toBe(401);
      expect(errors.jwt).toBe('No authorization token was found');
    });
  });
});
