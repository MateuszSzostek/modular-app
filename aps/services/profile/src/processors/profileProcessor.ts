import { NotFoundError, ProfileAttrs } from "../shared/services";
import { Profile } from "../models/profile";

export default class ProfileProcessor {
  async addProfile(profileAttrs: ProfileAttrs) {
    const existingProfile = await Profile.findOne({
      ownerId: profileAttrs?.ownerId,
      name: profileAttrs?.name,
    });

    if (existingProfile) {
      console.error(
        `Profile already exists: email: ${profileAttrs?.name} , ownerId: ${profileAttrs?.ownerId}`
      );
      return;
    }

    const profile = Profile.build({
      name: profileAttrs?.name,
      ownerId: profileAttrs?.ownerId,
    });
    await profile.save();

    return profile;
  }

  async getProfileById(id: string) {
    const existingProfile = await Profile.findOne({
      id,
    });

    if (!existingProfile) {
      throw new NotFoundError();
    }

    return existingProfile;
  }

  async getProfiles(ownerId: string) {
    const profiles = await Profile.find({
      ownerId,
    });

    if (!profiles) {
      throw new NotFoundError();
    }

    return profiles;
  }
}
