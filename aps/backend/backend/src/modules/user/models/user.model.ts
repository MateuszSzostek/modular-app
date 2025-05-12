import * as mongoose from 'mongoose';
export const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    profiles: {
      type: [String],
      required: false,
    },
  },
  { timestamps: true },
);

export interface User extends mongoose.Document {
  _id: string;
  firstName: string;
  lastName: string;
  profiles: string[];
}
