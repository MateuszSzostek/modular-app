import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../models/user.model';
@Injectable()
export class UserService {
  constructor(@InjectModel('user') private readonly userModel: Model<User>) {}
  async insertUser(firstName: string, lastName: string) {
    const newUser = new this.userModel({
      firstName,
      lastName,
    });

    await newUser.save();

    return newUser;
  }
  async getUser(userName: string) {
    const username = userName.toLowerCase();
    const user = await this.userModel.findOne({ username });
    return user;
  }
}
