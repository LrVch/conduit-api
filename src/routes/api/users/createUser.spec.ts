import supertest from 'supertest';
import app from '../../../app';
jest.mock('./routes/createUser');

const url = '/api/v1/users';

describe(`POST ${url}`, () => {
  test('It should create user', async () => {
    const response: any = await supertest(app)
      .post(url)
      .send({
        user: {
          username: 'jake',
          email: 'jake@jake.jake',
          password: 'password'
        }
      })
      .set('Accept', 'application/json');

    const { headers, statusCode, text, body, contentType } = response;
    const { email, username, token } = body.user;

    expect(statusCode).toBe(200);
    expect(username).toBe('jake');
    expect(email).toBe('jake@jake.jake');
    expect(token).toBeDefined();
  });

  test("It should get an error 'is already taken.' if username was taken", async () => {
    const response: any = await supertest(app)
      .post(url)
      .send({
        user: {
          username: 'takenUsername',
          email: 'jake@jake.jake',
          password: 'password'
        }
      })
      .set('Accept', 'application/json');

    const { statusCode, body } = response;
    const { username } = body.errors;

    expect(statusCode).toBe(422);
    expect(username).toBe('is already taken.');
  });

  test("It should get an error 'is already taken.' if email was taken", async () => {
    const response: any = await supertest(app)
      .post(url)
      .send({
        user: {
          username: 'username',
          email: 'takenEmail',
          password: 'password'
        }
      })
      .set('Accept', 'application/json');

    const { statusCode, body } = response;
    const { email } = body.errors;

    expect(statusCode).toBe(422);
    expect(email).toBe('is already taken.');
  });

  test("It should get an error 'can't be blank' if username, email and password weren't specified", async () => {
    const response: any = await supertest(app)
      .post(url)
      .send({
        user: {
          username: '',
          email: '',
          password: ''
        }
      })
      .set('Accept', 'application/json');

    const { statusCode, body } = response;
    const { email, password, username } = body.errors;

    expect(statusCode).toBe(422);
    expect(email).toBe("can't be blank.");
    expect(password).toBe("can't be blank.");
    expect(username).toBe("can't be blank.");
  });
});
