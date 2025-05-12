import * as mongoose from 'mongoose';

export const AccessControlDataSchema = new mongoose.Schema({
  //userId: { type: String, required: true },
  //profileId: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserAuthDataSchema' },
  profileId: { type: mongoose.Schema.Types.ObjectId, ref: 'ProfileSchema' },
  permissions: [String],
  // accesses: [
  //   {
  //   profileId: { type: mongoose.Schema.Types.ObjectId, ref: 'AccessData' },
  ////     permissions: [String],
  //  },
  // ],
});

export interface AccessControlData extends mongoose.Document {
  _id: string;
  userId: string;
  profileId: string;
  permissions: string[];
  //  accesses: {
  //   profileId: string;
  //   permissions: string[];
  // }[];
}
