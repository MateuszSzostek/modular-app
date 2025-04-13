import * as mongoose from 'mongoose';
export const UserAuthDataSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    isEmailConfirmed: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true },
);

export interface UserAuthData extends mongoose.Document {
  _id: string;
  email: string;
  password: string;
  userId: string;
  isEmailConfirmed: boolean;
}
