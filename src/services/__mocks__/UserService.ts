// const defaultUser = {
//   validPassword(password: string) {
//     if (password === 'validPassword') {
//       return true;
//     } else {
//       return false;
//     }
//   },
//   toAuthJSON() {
//     return {
//       username: 'username',
//       email: 'email',
//       token: 'token',
//       bio: '',
//       image: ''
//     };
//   }
// };

export default class UserService {
  static async createAndSave({
    username,
    email,
    password
  }: {
    username: string;
    email: string;
    password: string;
  }) {
    if (username === 'username') {
      const user = {
        toAuthJSON() {
          return 'user';
        }
      };
      return user;
    }

    if (username === 'failuser') {
      throw new Error('Cannot create user');
    }
  }

  // static findByEmail(email: string) {
  //   return {
  //     user: defaultUser
  //   };
  // }
}
