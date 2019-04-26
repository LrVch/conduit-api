import crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import { Document, Model, Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import config from '../../config';
import mongoose from '../../libs/mongoose';
import { IUser, IValidationError } from '../interfeises';

const { model } = mongoose;
const secret = config.get('jwt:secret');

export interface IUserModel extends IUser, Document {
  validPassword(password: string): boolean;
  toAuthJSON(): {
    username: string;
    email: string;
    token: string;
    bio: string;
    image: string;
  };
  generateJWT(): string;
}

export interface IUserDocument extends Document {
  salt?: string;
  password?: string;
}

const UserSchema = new Schema(
  {
    username: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
      index: true
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, 'is invalid'],
      index: true
    },
    bio: String,
    image: String,
    // favorites: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Article'
    //   },
    // ],
    // following: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User'
    //   },
    // ],
    password: {
      type: String,
      required: [true, "can't be blank"],
      validate: [
        {
          validator: (v: any) => {
            return v.length > 5;
          },
          msg: `length should be at least 6.`
        },
        {
          validator: (v: any) => {
            return v.length < 20;
          },
          msg: `length shouldn't be greater than 20.`
        }
      ]
    },
    salt: String
  },
  { timestamps: true }
);

UserSchema.plugin(uniqueValidator, { message: 'is already taken.' });

UserSchema.methods.validPassword = function(password: string): boolean {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
    .toString('hex');
  return this.password === hash;
};

UserSchema.pre('save', function(next) {
  const user: IUserDocument = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) {
    return next();
  }

  // generate a salt and hash a password
  try {
    user.salt = crypto.randomBytes(16).toString('hex');
    user.password = crypto
      .pbkdf2Sync(user.password, user.salt, 10000, 512, 'sha512')
      .toString('hex');
    next();
  } catch (e) {
    console.log(e);
    next(e);
  }
});

UserSchema.methods.toAuthJSON = function() {
  return {
    username: this.username,
    email: this.email,
    token: this.generateJWT(),
    bio: this.bio,
    image: this.image
  };
};

UserSchema.methods.generateJWT = function() {
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign(
    {
      id: this._id,
      username: this.username,
      exp: parseInt((exp.getTime() / 1000).toString(), 10)
    },
    secret
  );
};

export const User: Model<IUserModel> = model<IUserModel>('User', UserSchema);
