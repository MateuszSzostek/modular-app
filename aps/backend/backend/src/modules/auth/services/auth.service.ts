import { Injectable, Logger, NotAcceptableException } from '@nestjs/common';
import { UserService } from 'src/modules/user/services/user.service';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserAuthData } from '../models/auth.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    @InjectModel('UserAuthDataSchema')
    private readonly userAuthDataModel: Model<UserAuthData>,
    private readonly jwtService: JwtService,
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
    const newUserAuthData = new this.userAuthDataModel({
      userId,
      email,
      password: hashedPassword,
      isEmailConfirmed,
    });

    await newUserAuthData.save();

    return newUserAuthData;
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
    this.logger.verbose(userId);
    const userAuthData = await this.getUserAuthDataByUserId(userId);
    let passwordValid;

    this.logger.verbose(userAuthData);

    if (userAuthData) {
      passwordValid = await bcrypt.compare(password, userAuthData.password);
      this.logger.verbose(passwordValid);
    }
    if (userAuthData && passwordValid) {
      return true;
    }
    return false;
  }

  async generateAccessToken(userId: string, email: string): Promise<string> {
    const payload = { userId, email };
    const accessToken = this.jwtService.sign(payload);

    this.logger.verbose(`Generated access token for user: ${userId}`);
    return accessToken;
  }
}
