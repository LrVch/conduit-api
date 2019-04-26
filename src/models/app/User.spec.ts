import { User } from './User';

const defaultUser = {
  username: 'username',
  email: 'email@email.email',
  password: 'password'
};

beforeEach(async () => {
  await User.deleteMany({});
});

describe(`UserSchema`, () => {
  test('It should generate a jwt token', async () => {
    const user = new User(defaultUser);

    const token = user.generateJWT();

    expect(token).toBeDefined();
  });

  test('It should return user as json', async () => {
    const user = new User(defaultUser);

    const authUser = user.toAuthJSON();
    const { username, email, token, bio, image } = authUser;

    expect(authUser).toBeDefined();
    expect(username).toBe(defaultUser.username);
    expect(email).toBe(defaultUser.email);
    expect(token).toBeDefined();
    expect(bio).toBeUndefined();
    expect(image).toBeUndefined();
  });

  test('It should create user', async () => {
    const user = new User(defaultUser);
    const newUser = await user.save();

    const {
      _id,
      username,
      email,
      password,
      createdAt,
      updatedAt,
      salt
    } = newUser;

    expect(user).toBeDefined();
    expect(_id).toBeDefined();
    expect(username).toBeDefined();
    expect(email).toBeDefined();
    expect(password).toBeDefined();
    expect(createdAt).toBeDefined();
    expect(updatedAt).toBeDefined();
    expect(salt).toBeDefined();
  });

  test('It should return true if passport is valid', async () => {
    const user = new User(defaultUser);

    await user.save();

    const isValid = user.validPassword(defaultUser.password);

    expect(isValid).toBeTruthy();
  });

  test('It should return false if passport is invalid', async () => {
    const user = new User(defaultUser);

    await user.save();

    const isValid = user.validPassword('invalid password');

    expect(isValid).toBeFalsy();
  });

  test('It should update password on save', async () => {
    const user = new User(defaultUser);

    await user.save();

    const password = user.password;

    user.password = 'new password';

    await user.save();

    const newPassword = user.password;

    expect(password).not.toEqual(newPassword);
  });

  test("It should throw an error if username isn't unique", async () => {
    const user = new User(defaultUser);

    await user.save();

    const options = { ...defaultUser, email: 'ss@ss.ss' };
    const newUser = new User(options);

    try {
      await newUser.save();
    } catch (e) {
      const { username } = e.errors;

      expect(username).toBeDefined();
      expect(username.message).toBe('is already taken.');
    }
  });

  test('It should throw an error if username is undefined', async () => {
    const options = { ...defaultUser };
    delete options.username;
    const user = new User(options);

    try {
      await user.save();
    } catch (e) {
      const { username } = e.errors;

      expect(username).toBeDefined();
      expect(username.message).toBe("can't be blank");
    }
  });

  test("It should throw an error if username doesn't a regexp", async () => {
    const options = { ...defaultUser, username: '_@3' };
    const user = new User(options);

    try {
      await user.save();
    } catch (e) {
      const { username } = e.errors;

      expect(username).toBeDefined();
      expect(username.message).toBe('is invalid');
    }
  });

  test("It should throw an error if email doesn't unique", async () => {
    const user = new User(defaultUser);

    await user.save();

    const options = { ...defaultUser, username: 'ssss' };
    const newUser = new User(options);

    try {
      await newUser.save();
    } catch (e) {
      const { email } = e.errors;

      expect(email).toBeDefined();
      expect(email.message).toBe('is already taken.');
    }
  });

  test('It should throw an error if email is undefined', async () => {
    const options = { ...defaultUser };
    delete options.email;
    const user = new User(options);

    try {
      await user.save();
    } catch (e) {
      const { email } = e.errors;

      expect(email).toBeDefined();
      expect(email.message).toBe("can't be blank");
    }
  });

  test("It should throw an error if email doesn't a regexp", async () => {
    const options = { ...defaultUser, email: 'email' };
    const user = new User(options);

    try {
      await user.save();
    } catch (e) {
      const { email } = e.errors;

      expect(email).toBeDefined();
      expect(email.message).toBe('is invalid');
    }
  });

  test('It should throw an error if password is undefined', async () => {
    const options = { ...defaultUser };
    delete options.password;
    const user = new User(options);

    try {
      await user.save();
    } catch (e) {
      const { password } = e.errors;

      expect(password).toBeDefined();
      expect(password.message).toBe("can't be blank");
    }
  });

  test('It should throw an error if password lenght greater than 20', async () => {
    const options = {
      ...defaultUser,
      password: '123456789011121314151617181920'
    };
    const user = new User(options);

    try {
      await user.save();
    } catch (e) {
      const { password } = e.errors;

      expect(password).toBeDefined();
      expect(password.message).toBe("length shouldn't be greater than 20.");
    }
  });

  test('It should throw an error if password lenght less than 6', async () => {
    const options = { ...defaultUser, password: '123' };
    const user = new User(options);

    try {
      await user.save();
    } catch (e) {
      const { password } = e.errors;

      expect(password).toBeDefined();
      expect(password.message).toBe('length should be at least 6.');
    }
  });
});
