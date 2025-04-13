import { Injectable, Logger, NotAcceptableException } from '@nestjs/common';
import { UserService } from 'src/modules/user/services/user.service';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserAuthData } from '../models/auth.model';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    @InjectModel('UserAuthDataSchema')
    private readonly userAuthDataModel: Model<UserAuthData>,
  ) {}

  private readonly logger = new Logger(AuthService.name);
  private readonly jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret';
  private readonly jwtExpiresIn = '24h';

  saltOrRounds = 10;

  async getUserAuthDataByUserId(userId: string) {
    const userAuthData = await this.userAuthDataModel.findOne({ userId });
    return userAuthData;
  }

  async getUserAuthDataByUserEmail(email: string) {
    const userAuthData = await this.userAuthDataModel.findOne({ email });
    return userAuthData;
  }

  async insertUserAuthData(
    userId: string,
    email: string,
    hashedPassword,
    isEmailConfirmed: boolean,
  ) {
    const newUserAUthData = new this.userAuthDataModel({
      userId,
      email,
      password: hashedPassword,
      isEmailConfirmed,
    });

    await newUserAUthData.save();

    return newUserAUthData;
  }

  async doesUserExists(userEmail: string) {
    const existingUserAuthData = await this.userAuthDataModel.findOne({
      email: userEmail,
    });

    this.logger.verbose(`Existing user data: ${existingUserAuthData}`);
    return existingUserAuthData === null ? false : true;
  }

  async hashPassword(password: string) {
    const hashedPassword = await bcrypt.hash(password, this.saltOrRounds);

    return hashedPassword;
  }

  async validateUser(userId: string, password: string): Promise<any> {
    const userAuthData = await this.getUserAuthDataByUserId(userId);
    let passwordValid;
    if (userAuthData) {
      passwordValid = await bcrypt.compare(password, userAuthData.password);
    }
    if (userAuthData && passwordValid) {
      return true;
    }
    return false;
  }

  async generateAccessToken(userId: string, email: string): Promise<string> {
    const payload = { userId, email };
    const accessToken = jwt.sign(payload, this.jwtSecret, {
      expiresIn: this.jwtExpiresIn,
    });

    this.logger.verbose(`Generated access token for user: ${userId}`);
    return accessToken;
  }
}
