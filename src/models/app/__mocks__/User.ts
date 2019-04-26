const user = {
  validPassword(password: string) {
    if (password === 'validPassword') {
      return true;
    } else {
      return false;
    }
  },
  toAuthJSON() {
    return {
      username: 'username',
      email: 'email',
      token: 'token',
      bio: '',
      image: ''
    };
  }
};

export class User {
  save = jest.fn();
  username: string;
  email: string;
  password: string;

  constructor({
    username,
    email,
    password
  }: {
    username: string;
    email: string;
    password: string;
  }) {
    this.username = username;
    this.email = email;
    this.password = password;
  }

  static findOne({ email }: { email?: string }) {
    return new Promise((res, rej) => {
      if (email && email === 'knowUser') {
        res(user);
      }

      if (email && email === 'unknowUser') {
        res(undefined);
      }

      if (email && email === 'badUser') {
        const error: any = new Error();
        error.status = 500;
        error.message = 'Ops, something went wrong, cannot get user by email.';
        rej(error);
      }
    });
  }
}
