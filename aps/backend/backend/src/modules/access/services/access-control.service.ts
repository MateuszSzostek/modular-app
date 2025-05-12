import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AccessControlData } from '../models/access.model';

@Injectable()
export class AccessControlService {
  constructor(
    @InjectModel('AccessDataSchema')
    private readonly accessDataModel: Model<AccessControlData>,
  ) {}

  async getAccessData(userId: string, profileId: string): Promise<string[]> {
    const accessData = await this.accessDataModel
      .findOne({ userId, profileId })
      .exec();
    if (!accessData) return [];

    return accessData ? accessData.permissions : [];
  }

  async grantAccess(profileId: string, userId: string, permissions: string[]) {
    const accessData = await this.accessDataModel
      .findOne({ profileId, userId })
      .exec();
    if (!accessData) throw new Error('accessData not found');

    const set = new Set<string>(accessData.permissions);
    permissions.forEach((item) => set.add(item));
    Array.from(set);
    accessData.permissions = Array.from(set);

    return accessData.save();
  }

  async revokeAccess(profileId: string, userId: string, permissions: string[]) {
    const accessData = await this.accessDataModel
      .findOne({ profileId, userId })
      .exec();

    if (!accessData) throw new Error('accessData not found');

    accessData.permissions = accessData.permissions.filter(
      (permission) => !permissions.includes(permission),
    );

    return accessData.save();
  }
}
