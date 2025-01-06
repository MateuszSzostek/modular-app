/*
import { ProfileAttrs } from "../shared/services";
import { Profile } from "../models/profile";

export default class ProfileProcessor {
  async addUser(userAttrs: ProfileAttrs) {
    const existingUser = await Profile.findOne({ email: userAttrs?.email });

    if (existingUser) {
      console.error(
        `User already exists: email: ${userAttrs?.email} , id: ${userAttrs?.userId}`
      );
      return;
    }

    const user = User.build({ ...userAttrs });
    await user.save();
  }
}
  */
