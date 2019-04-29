import * as jwt from 'jsonwebtoken';
import supertest from 'supertest';
import app from '../../../app';
import config from '../../../config';
jest.mock('./routes/updateUser');

const url = '/api/v1/user';
const secretOpt = config.get('jwt:secret');

const getToken = (id: string, secret: string = secretOpt) =>
  jwt.sign(
    {
      id,
      username: 'username'
    },
    secret
  );

describe(`PUT ${url}`, () => {
  test('It should update user', async () => {
    const response: any = await supertest(app)
      .put(url)
      .set('Authorization', `Bearer ${getToken('validId')}`)
      .send({
        user: {
          username: 'new name',
          email: 'new email',
          password: 'new password'
        }
      })
      .set('Accept', 'application/json');

    const { statusCode, body } = response;
    const { email, username, token } = body.user;

    expect(statusCode).toBe(200);
    expect(username).toBe('new name');
    expect(email).toBe('new email');
    expect(token).toBeDefined();
  });

  test("It shouldn't update user due to failed authorization", async () => {
    const response: any = await supertest(app)
      .put(url)
      .send({
        user: {
          username: 'new name',
          email: 'new email',
          password: 'new password'
        }
      })
      .set('Accept', 'application/json');

    const { statusCode, body } = response;

    expect(statusCode).toBe(401);
  });
});
