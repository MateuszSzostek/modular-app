import * as mongoose from 'mongoose';
export const ProfileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    avatar: {
      name: String,
    },
  },
  { timestamps: true },
);

export interface ProfileData extends mongoose.Document {
  _id: string;
  name: string;
  userId: string;
  avatar: string | null;
}
