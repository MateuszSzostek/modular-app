import { UserAttrs } from "../shared/services";
import { User } from "../models/user";

export default class UserProcessor {
  async addUser(userAttrs: UserAttrs) {
    const existingUser = await User.findOne({ email: userAttrs?.email });

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
