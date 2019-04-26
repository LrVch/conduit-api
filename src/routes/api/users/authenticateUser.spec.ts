import supertest from 'supertest';
import app from '../../../app';
jest.mock('./routes/authenticateUser');

const url = '/api/v1/users/login';

describe(`POST ${url}`, () => {
  test('It should authenticate user', async () => {
    const response: any = await supertest(app)
      .post(url)
      .send({
        user: {
          email: 'user@user.user',
          password: 'password'
        }
      })
      .set('Accept', 'application/json');

    const { statusCode, body } = response;
    const { email, username, token } = body.user;

    expect(statusCode).toBe(200);
    expect(username).toBe('user');
    expect(email).toBe('user@user.user');
    expect(token).toBeDefined();
  });
});
