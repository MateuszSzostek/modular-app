import mongoose from "mongoose";
import { ProfileAttrs } from "../shared/services";

// An interface that describes the properties
// that a Profile Model has
interface ProfileModel extends mongoose.Model<ProfileDoc> {
  build(attrs: ProfileAttrs): ProfileDoc;
}

// An interface that describes the properties
// that a Profile Document has
interface ProfileDoc extends ProfileAttrs, mongoose.Document {}

const profileSchema = new mongoose.Schema({
  ownerId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: false,
  },
});

profileSchema.statics.build = (attrs: ProfileAttrs) => {
  return new Profile(attrs);
};

const Profile = mongoose.model<ProfileDoc, ProfileModel>(
  "Profile",
  profileSchema
);

export { Profile };
