export interface IUser {
  email: string;
  username: string;
  bio?: string;
  image?: string;
  salt?: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
