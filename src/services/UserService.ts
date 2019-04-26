import { User } from '../models';

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
    const user = new User({ username, email, password });
    await user.save();
    return user;
  }

  static findByEmail(email: string) {
    return User.findOne({ email });
  }
}
