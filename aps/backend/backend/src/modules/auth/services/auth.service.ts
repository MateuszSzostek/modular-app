import { Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserAuthData } from '../models/auth.model';
import { JwtService } from '@nestjs/jwt';
import { UserController } from 'src/modules/user/controllers/user.controller';
const { v4 } = require('uuid');

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('UserAuthDataSchema')
    private readonly userAuthDataModel: Model<UserAuthData>,
    private readonly jwtService: JwtService,
  ) {}

  private readonly logger = new Logger(AuthService.name);
  // private readonly jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret';
  // private readonly jwtExpiresIn = '24h';

  saltOrRounds = 10;

  async getUserAuthDataByUserId(userId: string) {
    const userAuthData = await this.userAuthDataModel.findOne({ userId });
    return userAuthData;
  }

  async getUserAuthDataById(id: string) {
    const userAuthData = await this.userAuthDataModel.findOne({ _id: id });
    return userAuthData;
  }

  async getUserAuthDataByResetPasswordToken(resetPasswordToken: string) {
    const userAuthData = await this.userAuthDataModel.findOne({
      resetPasswordToken,
    });
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
    emailConfirmationToken: string,
    isPrivacyPolicyAccepted: boolean,
  ) {
    const newUserAuthData = new this.userAuthDataModel({
      userId,
      email,
      password: hashedPassword,
      isEmailConfirmed,
      emailConfirmationToken,
      isPrivacyPolicyAccepted,
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

  async generateEmailConfirmationToken(): Promise<string> {
    const emailConfirmationToken = v4();

    this.logger.verbose(`Generated email confirmation token.`);
    return emailConfirmationToken;
  }

  async generateResetPasswordToken(): Promise<string> {
    const resetPasswordToken = v4();

    this.logger.verbose(`Generated reset password token.`);
    return resetPasswordToken;
  }

  async validateResetPasswordToken(
    reqResetPasswordToken: string,
    userResetPasswordToken: string,
  ): Promise<boolean> {
    return reqResetPasswordToken === userResetPasswordToken;
  }

  async comparePasswords(
    newPassword: string,
    newPasswordConfirmation: string,
  ): Promise<boolean> {
    return newPassword === newPasswordConfirmation;
  }

  async changePassword(
    newPassword: string,
    userAuthData: UserAuthData,
  ): Promise<boolean> {
    const hashedPassword = await this.hashPassword(newPassword);
    this.logger.verbose(userAuthData);
    userAuthData.password = hashedPassword;
    userAuthData.resetPasswordToken = null;

    await userAuthData.save();

    return true;
  }

  async confirmEmail(token: string, userId: string): Promise<boolean> {
    const userAuthData = await this.getUserAuthDataByUserId(userId);
    this.logger.debug(userId);
    this.logger.debug(token);
    this.logger.debug(userAuthData);

    if (!userAuthData) {
      return false;
    }

    if (userAuthData.emailConfirmationToken === token) {
      userAuthData.isEmailConfirmed = true;
      userAuthData.emailConfirmationToken = null;
      await userAuthData.save();
      return true;
    }
    return false;
  }
}
