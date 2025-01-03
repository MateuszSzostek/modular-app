import mongoose from "mongoose";
import { UserAttrs } from "../shared/services";

// An interface that describes the properties
// that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the properties
// that a User Document has
interface UserDoc extends mongoose.Document {
  email: string;
  name: string;
  surname: string;
  birthDate: string;
  identifier: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: false,
  },
  surname: {
    type: String,
    required: false,
  },
  birthDate: {
    type: String,
    required: false,
  },
  identifier: {
    type: String,
    required: false,
  },
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
