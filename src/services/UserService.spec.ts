import Userservice from './UserService';

jest.mock('../models/app/User');

describe(`Userservice`, () => {
  test('It should create user', async () => {
    const user = await Userservice.createAndSave({
      username: 'username',
      email: 'email',
      password: 'password'
    });

    const { username, email, password } = user;

    expect(user).toBeDefined();
    expect(username).toBe('username');
    expect(email).toBe('email');
    expect(password).toBe('password');
  });

  test('It should throw an error while finding user by email', async () => {
    try {
      await Userservice.findByEmail('badUser');
    } catch (e) {
      const { status, message } = e;
      expect(status).toBe(500);
      expect(message).toBe(
        'Ops, something went wrong, cannot get user by email.'
      );
    }
  });

  test("It shouldn't find user by email", async () => {
    const user = await Userservice.findByEmail('unknowUser');
    expect(user).toBeUndefined();
  });

  test('It should find user by email', async () => {
    const user = await Userservice.findByEmail('knowUser');

    expect(user).toBeDefined();
  });

  test('It should throw an error while finding user by id', async () => {
    try {
      await Userservice.findById('badUser');
    } catch (e) {
      const { status, message } = e;
      expect(status).toBe(500);
      expect(message).toBe('Ops, something went wrong, cannot get user by id.');
    }
  });

  test("It shouldn't find user by id", async () => {
    const user = await Userservice.findById('unknowUser');
    expect(user).toBeUndefined();
  });

  test('It should find user by id', async () => {
    const user = await Userservice.findById('knowUser');

    expect(user).toBeDefined();
  });
});
