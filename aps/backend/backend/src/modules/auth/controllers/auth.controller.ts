import {
  Controller,
  Post,
  Body,
  Res,
  Req,
  HttpStatus,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { ForgotPasswordDto } from '../dto/forgot-password.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { SignInDto } from '../dto/sign-in.dto';
import { SingUpDto } from '../dto/sing-up.dto';
import { Response, Request } from 'express';
import { AuthGuard } from '../guards/auth.guard';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserService } from 'src/modules/user/services/user.service';
import CODES from 'src/utils/translation-codes';
import { AUTH_RESPONSE_CODES } from '../utils/auth.response-codes';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  private readonly logger = new Logger(AuthService.name);

  /*
  @Post('forgot-password')
  @ApiOperation({ summary: 'Request password reset' })
  @ApiResponse({ status: 200, description: 'Password reset link sent' })
  @ApiResponse({ status: 400, description: 'Invalid email' })
  @ApiBody({ type: ForgotPasswordDto })
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    //@ts-ignore
    await this.authService.forgotPassword(forgotPasswordDto);
    return { message: 'Password reset link sent' };
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Reset password' })
  @ApiResponse({ status: 200, description: 'Password reset successful' })
  @ApiResponse({ status: 400, description: 'Invalid token' })
  @ApiBody({ type: ResetPasswordDto })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    //@ts-ignore
    await this.authService.resetPassword(resetPasswordDto);
    return { message: 'Password has been reset' };
  }

  */

  @Post('sign-in')
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 200, description: 'User signin successfully' })
  @ApiBody({ type: SignInDto })
  async signIn(@Body() signInDto: SignInDto, @Res() res: Response) {
    const userAuthData = await this.authService.getUserAuthDataByUserEmail(
      signInDto?.email,
    );

    if (!userAuthData) {
      this.logger.log(
        `User with email: ${signInDto?.email} does not exists in database.`,
      );
      return res.status(HttpStatus.BAD_REQUEST).json({
        messages: [AUTH_RESPONSE_CODES.WRONG_SIGN_IN_DATA],
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    const isValidPassword = await this.authService.validateUser(
      userAuthData?.userId,
      signInDto?.password,
    );

    this.logger.log(isValidPassword);

    if (!isValidPassword) {
      this.logger.log(
        `User with email: ${signInDto?.email} entered wrong password`,
      );
      return res.status(HttpStatus.BAD_REQUEST).json({
        messages: [AUTH_RESPONSE_CODES.WRONG_SIGN_IN_DATA],
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    const accessToken = await this.authService.generateAccessToken(
      userAuthData?._id,
      userAuthData?.email,
    );

    this.logger.log(
      `User with email: ${signInDto?.email} logged in successfully`,
    );

    res.cookie('auth_token', accessToken, { httpOnly: true, secure: true });
    return res.status(HttpStatus.OK).json({
      messages: [AUTH_RESPONSE_CODES.SIGNED_IN_SUCCESSFULLY],
      statusCode: HttpStatus.OK,
    });
  }

  //post / signup
  @Post('sign-up')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({ status: 400, description: 'Email already in use' })
  @ApiBody({ type: SingUpDto })
  async signUp(@Body() signUpDto: SingUpDto, @Res() res: Response) {
    this.logger.log(
      `Someone with email: ${signUpDto?.email} attempt to register.`,
    );

    const hashedPassword = await this.authService.hashPassword(
      signUpDto?.password,
    );

    if (!hashedPassword) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        messages: [`${CODES.SERVER}.${CODES.SOMETHING_WENT_WRONG}`],
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    const isExistingUserAuthData = await this.authService.doesUserExists(
      signUpDto?.email,
    );

    if (isExistingUserAuthData) {
      this.logger.log(
        `Someone with email: ${signUpDto?.email} already exists in database.`,
      );
      return res.status(HttpStatus.BAD_REQUEST).json({
        messages: [AUTH_RESPONSE_CODES.USER_AUTH_DATA_ALREADY_EXISTS],
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    this.logger.log(
      `Someone with email: ${signUpDto?.email} does not exists in database.`,
    );

    const newUser = await this.userService.insertUser(
      signUpDto?.firstName,
      signUpDto?.lastName,
    );

    if (newUser) {
      await this.authService.insertUserAuthData(
        newUser?.id,
        signUpDto?.email,
        hashedPassword,
        false,
      );
    }

    this.logger.log(
      `User with email: ${signUpDto?.email}, firstName: ${signUpDto?.firstName}, lastName: ${signUpDto?.lastName} has been save in users table`,
    );

    return res.status(HttpStatus.BAD_REQUEST).json({
      messages: [AUTH_RESPONSE_CODES.REGISTERED_SUCCESSFULLY],
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }

  @Post('sign-out')
  @ApiOperation({ summary: 'User logout' })
  @ApiResponse({ status: 200, description: 'Logged out successfully' })
  @UseGuards(AuthGuard)
  async logout(@Res() res: Response) {
    res.clearCookie('auth_token');
    res.status(HttpStatus.OK).json({
      messages: [AUTH_RESPONSE_CODES.SIGNED_OUT_SUCCESSFULLY],
      statusCode: HttpStatus.OK,
    });
  }

  @Post('is-authenticated')
  @ApiOperation({ summary: 'Is user authenticated?' })
  @ApiResponse({ status: 200, description: 'User is authenticated' })
  @ApiResponse({ status: 401, description: 'User is not authenticated' })
  @UseGuards(AuthGuard)
  async isAuthenticated(@Req() req: Request, @Res() res: Response) {
    const user = req.user;
    if (user) {
      return res.status(HttpStatus.OK).json({
        isAuthenticated: true,
        user,
        messages: [AUTH_RESPONSE_CODES.IS_AUTHENTICATED],
        statusCode: HttpStatus.OK,
      });
    } else {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        isAuthenticated: false,
        messages: [AUTH_RESPONSE_CODES.IS_NOT_AUTHENTICATED],
        statusCode: HttpStatus.UNAUTHORIZED,
      });
    }
  }
}
