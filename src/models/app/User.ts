import mongoose from '../../libs/mongoose';
const { Schema, model } = mongoose;

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
    hash: String,
    salt: String
  },
  { timestamps: true }
);

export const User = model('User', UserSchema);
