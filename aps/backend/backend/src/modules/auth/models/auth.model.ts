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
    isPrivacyPolicyAccepted: {
      type: Boolean,
      required: true,
    },
    isEmailConfirmed: {
      type: Boolean,
      required: true,
    },
    emailConfirmationToken: {
      type: String,
      required: false,
    },
    resetPasswordToken: {
      type: String,
      required: false,
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
  emailConfirmationToken: string | null;
  resetPasswordToken: string | null;
}
