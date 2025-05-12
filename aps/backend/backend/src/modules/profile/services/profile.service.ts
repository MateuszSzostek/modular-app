import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProfileData } from '../models/profile.model';
import { Model } from 'mongoose';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel('ProfileSchema')
    private readonly profileModel: Model<ProfileData>,
  ) {}

  async createProfile(name: string, avatar: string) {
    const newProfile = new this.profileModel({
      name,
      avatar,
    });

    await newProfile.save();

    return newProfile;
  }

  async getProfile(id: string) {
    const profile = await this.profileModel.findOne({
      _id: id,
    });

    return profile;
  }

  async updateProfile(id: string, name: string, avatar: string) {
    try {
      const updatedProfile = await this.profileModel.findById(id);

      if (!updatedProfile) {
        return null;
      }

      updatedProfile.name = name;
      updatedProfile.avatar = avatar;

      updatedProfile.save();

      return updatedProfile;
    } catch (error) {
      throw new Error(`Error updating profile: ${error.message}`);
    }
  }

  async deleteProfile(id: string): Promise<boolean> {
    try {
      const result = await this.profileModel.deleteOne({ _id: id });

      return result.deletedCount > 0;
    } catch (error) {
      throw new Error(`Error deleting profile: ${error.message}`);
    }
  }

  async doesProfileExists(id: string): Promise<boolean> {
    const existingProfile = await this.profileModel.findOne({
      _id: id,
    });

    if (!existingProfile) {
      return false;
    }

    return true;
  }
}
