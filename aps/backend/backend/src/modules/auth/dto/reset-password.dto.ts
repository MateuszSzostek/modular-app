import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches, MinLength } from 'class-validator';
import CODES from 'src/utils/translation-codes';

export class ResetPasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  userAuthDataId: string;

  @ApiProperty()
  @IsNotEmpty()
  resetPasswordToken: string;

  @ApiProperty()
  @IsNotEmpty({ message: `${CODES.NEW_PASSWORD}.${CODES.MUST_NOT_BE_EMPTY}` })
  @MinLength(6, {
    message: `${CODES.NEW_PASSWORD}.${CODES.AT_LEAST_6_CHARACTERS_LONG}`,
  })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    { message: `${CODES.NEW_PASSWORD}.${CODES.MUST_MATCH_PASSWORD_REGEX}` },
  )
  newPassword: string;

  @ApiProperty()
  @IsNotEmpty({
    message: `${CODES.NEW_PASSWORD_CONFIRMATION}.${CODES.MUST_NOT_BE_EMPTY}`,
  })
  @MinLength(6, {
    message: `${CODES.NEW_PASSWORD_CONFIRMATION}.${CODES.AT_LEAST_6_CHARACTERS_LONG}`,
  })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    {
      message: `${CODES.NEW_PASSWORD_CONFIRMATION}.${CODES.MUST_MATCH_PASSWORD_REGEX}`,
    },
  )
  newPasswordConfirmation: string;
}
