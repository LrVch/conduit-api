import * as App from './app';
import * as db from './db';

jest.mock('./db');

describe('Singup /', () => {
  test('It should call "saveUser" with "User" object', () => {
    const email = 'test@test.ai';
    const password = '123';

    App.handleSigup(email, password);

    expect(db.saveUser).toHaveBeenCalled();
    expect(db.saveUser).toHaveBeenCalledWith({ email, password });
  });
});
