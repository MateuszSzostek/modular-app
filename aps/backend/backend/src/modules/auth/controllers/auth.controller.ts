import {
  Controller,
  Post,
  Body,
  Res,
  Req,
  HttpStatus,
  UseGuards,
  Logger,
  Query,
  Param,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SignInDto } from '../dto/sign-in.dto';
import { SingUpDto } from '../dto/sing-up.dto';
import { Response, Request } from 'express';
import { AuthGuard } from '../guards/auth.guard';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserService } from 'src/modules/user/services/user.service';
import CODES from 'src/utils/translation-codes';
import { AUTH_RESPONSE_CODES } from '../utils/auth.response-codes';
import { MailService } from 'src/modules/mail/services/mail.service';
import { ForgotPasswordDto } from '../dto/forgot-password.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';

@Controller('api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly mailService: MailService,
  ) {}

  private readonly logger = new Logger(AuthService.name);

  @Post('forgot-password')
  @ApiOperation({ summary: 'Request password reset' })
  @ApiResponse({ status: 200, description: 'Password reset link sent' })
  @ApiResponse({ status: 400, description: 'Invalid email' })
  @ApiBody({ type: ForgotPasswordDto })
  async forgotPassword(
    @Body() forgotPasswordDto: ForgotPasswordDto,
    @Res() res: Response,
  ) {
    const userAuthData = await this.authService.getUserAuthDataByUserEmail(
      forgotPasswordDto?.email,
    );

    if (!userAuthData) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: [AUTH_RESPONSE_CODES.USER_AUTH_DATA_DOES_NOT_EXISTS],
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    const resetPasswordToken =
      await this.authService.generateEmailConfirmationToken();

    userAuthData.resetPasswordToken = resetPasswordToken;

    await userAuthData.save();

    this.logger.log(userAuthData);

    this.mailService.sendEmail(
      forgotPasswordDto?.email,
      'Brighter – Zresetuj swoje haslo',
      `Szanowny Użytkowniku,\n\nOtrzymaliśmy prośbę o zresetowanie hasła do Twojego konta w Brighter. Aby ustawić nowe hasło, kliknij w poniższy link:\n\n[${process.env.FRONT_END_URL}/auth/reset-password/${userAuthData?._id}/${resetPasswordToken}]\n\nJeśli nie złożyłeś takiej prośby, zignoruj tę wiadomość – Twoje hasło pozostanie bez zmian.\n\nZ poważaniem,\nZespół Brighter`,
    );

    this.logger.log(
      `Email to ${userAuthData?.email} with reset password link has been sent`,
    );

    return res.status(HttpStatus.OK).json({
      data: {
        message: [`${AUTH_RESPONSE_CODES.RESET_PASSWORD_LINK_SENT}`],
        statusCode: HttpStatus.OK,
      },
    });
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Reset password' })
  @ApiResponse({ status: 200, description: 'Password reset successful' })
  @ApiResponse({ status: 400, description: 'Invalid token' })
  @ApiBody({ type: ResetPasswordDto })
  async resetPassword(
    @Req() req: Request,
    @Body() resetPasswordDto: ResetPasswordDto,
    @Res() res: Response,
  ) {
    const user: { userId: string } = req.user as { userId: string };

    const userAuthData = await this.authService.getUserAuthDataById(
      resetPasswordDto?.userAuthDataId,
    );

    if (!userAuthData) {
      this.logger.log(`Could not find userAuthData by userId`);
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: [AUTH_RESPONSE_CODES.USER_AUTH_DATA_DOES_NOT_EXISTS],
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    if (!userAuthData?.resetPasswordToken) {
      this.logger.log(
        `User with id: ${user?.userId} does not have resetPasswordToken generated in his userAuthData.`,
      );
      return res.status(HttpStatus.BAD_REQUEST).json({
        data: {
          message: [AUTH_RESPONSE_CODES.RESET_PASSWORD_TOKEN_EXPIRED],
          statusCode: HttpStatus.BAD_REQUEST,
        },
      });
    }

    const isValidResetPasswordToken =
      await this.authService.validateResetPasswordToken(
        resetPasswordDto?.resetPasswordToken,
        userAuthData?.resetPasswordToken,
      );

    if (!isValidResetPasswordToken) {
      this.logger.log(
        `User with id: ${user?.userId} does not sent correct resetPasswordToken.`,
      );
      return res.status(HttpStatus.BAD_REQUEST).json({
        data: {
          message: [AUTH_RESPONSE_CODES.RESET_PASSWORD_TOKEN_EXPIRED],
          statusCode: HttpStatus.BAD_REQUEST,
        },
      });
    }

    const arePasswordsTheSame = await this.authService.comparePasswords(
      resetPasswordDto?.newPassword,
      resetPasswordDto?.newPasswordConfirmation,
    );

    if (!arePasswordsTheSame) {
      this.logger.log(
        `Passwords provider for set new password of user with id: ${user?.userId} are not the same.`,
      );
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: [AUTH_RESPONSE_CODES.PASSWORDS_ARE_NOT_THE_SAME],
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    const isPasswordChanged = await this.authService.changePassword(
      resetPasswordDto?.newPassword,
      userAuthData,
    );

    if (!isPasswordChanged) {
      this.logger.log(
        `Saving new password of user with id: ${user?.userId} failed`,
      );
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: [AUTH_RESPONSE_CODES.PASSWORD_COULD_NOT_BE_UPDATE],
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    return res.status(HttpStatus.OK).json({
      data: {
        message: [AUTH_RESPONSE_CODES.PASSWORD_UPDATED],
        statusCode: HttpStatus.OK,
      },
    });
  }

  @Post('sign-in')
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 200, description: 'User signin successfully' })
  @ApiBody({ type: SignInDto })
  async signIn(@Body() signInDto: SignInDto, @Res() res: Response) {
    const userAuthData = await this.authService.getUserAuthDataByUserEmail(
      signInDto?.email,
    );

    this.logger.verbose(userAuthData);

    if (!userAuthData) {
      this.logger.log(
        `User with email: ${signInDto?.email} does not exists in database.`,
      );
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: [AUTH_RESPONSE_CODES.USER_AUTH_DATA_DOES_NOT_EXISTS],
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    const isUserAccountConfirmed = userAuthData?.isEmailConfirmed;

    if (!isUserAccountConfirmed) {
      this.logger.log(
        `User with email: ${signInDto?.email} does not confirmet account yet.`,
      );
      return res.status(HttpStatus.OK).json({
        data: {
          message: [AUTH_RESPONSE_CODES.ACCOUNT_NOT_CONFIRMED],
          statusCode: HttpStatus.OK,
        },
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
        message: [AUTH_RESPONSE_CODES.WRONG_SIGN_IN_DATA],
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
      data: {
        message: [AUTH_RESPONSE_CODES.SIGNED_IN_SUCCESSFULLY],
        statusCode: HttpStatus.OK,
      },
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
        data: {
          message: [`${CODES.SERVER}.${CODES.SOMETHING_WENT_WRONG}`],
          statusCode: HttpStatus.BAD_REQUEST,
        },
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
        data: {
          message: [AUTH_RESPONSE_CODES.USER_AUTH_DATA_ALREADY_EXISTS],
          statusCode: HttpStatus.BAD_REQUEST,
        },
      });
    }

    this.logger.log(
      `Someone with email: ${signUpDto?.email} does not exists in database.`,
    );

    const newUser = await this.userService.insertUser(
      signUpDto?.firstName,
      signUpDto?.lastName,
      [],
    );

    const emailConfirmationToken =
      await this.authService.generateEmailConfirmationToken();

    if (newUser) {
      await this.authService.insertUserAuthData(
        newUser?.id,
        signUpDto?.email,
        hashedPassword,
        false,
        emailConfirmationToken,
        true,
      );
    }

    this.logger.log(
      `User with email: ${signUpDto?.email}, firstName: ${signUpDto?.firstName}, lastName: ${signUpDto?.lastName} has been save in users table`,
    );

    this.mailService.sendEmail(
      signUpDto?.email,
      'Brighter – Potwierdzenie Twojego konta',
      `Szanowny Użytkowniku,\n\nDziękujemy za założenie konta w Brighter. Aby zakończyć proces rejestracji, prosimy o potwierdzenie swojego konta, klikając w poniższy link:\n\n[${process.env.FRONT_END_URL}/auth/confirm-account/${newUser?._id}/${emailConfirmationToken}]\n\nZ poważaniem,\nZespół Brighter`,
    );

    this.logger.log(
      `Email to ${signUpDto?.email}with account confirmation link has been sent`,
    );

    return res.status(HttpStatus.OK).json({
      data: {
        message: [AUTH_RESPONSE_CODES.REGISTERED_SUCCESSFULLY],
        statusCode: HttpStatus.OK,
      },
    });
  }

  @Post('sign-out')
  @ApiOperation({ summary: 'User logout' })
  @ApiResponse({ status: 200, description: 'Logged out successfully' })
  @UseGuards(AuthGuard)
  async logout(@Res() res: Response) {
    res.clearCookie('auth_token');
    res.status(HttpStatus.OK).json({
      data: {
        message: [AUTH_RESPONSE_CODES.SIGNED_OUT_SUCCESSFULLY],
        statusCode: HttpStatus.OK,
      },
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
        data: {
          isAuthenticated: true,
          user,
          message: [AUTH_RESPONSE_CODES.IS_AUTHENTICATED],
          statusCode: HttpStatus.OK,
        },
      });
    } else {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        data: {
          isAuthenticated: false,
          message: [AUTH_RESPONSE_CODES.IS_NOT_AUTHENTICATED],
          statusCode: HttpStatus.UNAUTHORIZED,
        },
      });
    }
  }

  @Post('confirm-account/:userId/:emailConfirmationToken')
  @ApiOperation({ summary: 'Confirm account' })
  @ApiResponse({ status: 200, description: 'Account confirmed' })
  async confirmAccount(
    @Param('userId') userId: string,
    @Param('emailConfirmationToken') emailConfirmationToken: string,
    @Res() res: Response,
  ) {
    const isEmailConfirmed = await this.authService.confirmEmail(
      emailConfirmationToken,
      userId,
    );

    if (isEmailConfirmed) {
      return res.status(HttpStatus.OK).json({
        data: {
          message: [AUTH_RESPONSE_CODES.EMAIL_CONFIRMED_SUCCESSFULLY],
          statusCode: HttpStatus.OK,
        },
      });
    } else {
      return res.status(HttpStatus.BAD_REQUEST).json({
        data: {
          message: [AUTH_RESPONSE_CODES.EMAIL_CONFIRMED_FAILURE],
          statusCode: HttpStatus.BAD_REQUEST,
        },
      });
    }
  }
}
