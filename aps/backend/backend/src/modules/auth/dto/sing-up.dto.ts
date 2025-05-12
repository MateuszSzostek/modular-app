import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import CODES from 'src/utils/translation-codes';

export class SingUpDto {
  @ApiProperty()
  @IsEmail({}, { message: `${CODES.EMIAL}.${CODES.MUST_BE_AN_EMAIL}` })
  @IsNotEmpty({ message: `${CODES.EMIAL}.${CODES.MUST_NOT_BE_EMPTY}` })
  email: string;

  @ApiProperty()
  @IsString({ message: `${CODES.FIRST_NAME}.${CODES.MUST_BE_A_STRING}` })
  @IsNotEmpty({ message: `${CODES.FIRST_NAME}.${CODES.MUST_NOT_BE_EMPTY}` })
  firstName: string;

  @ApiProperty()
  @IsString({ message: `${CODES.LAST_NAME}.${CODES.MUST_BE_A_STRING}` })
  @IsNotEmpty({ message: `${CODES.LAST_NAME}.${CODES.MUST_NOT_BE_EMPTY}` })
  lastName: string;

  @ApiProperty()
  @IsBoolean({ message: `${CODES.LAST_NAME}.${CODES.MUST_BE_TRUE}` })
  @IsNotEmpty({ message: `${CODES.LAST_NAME}.${CODES.MUST_NOT_BE_EMPTY}` })
  privacyPolicy: boolean;

  @ApiProperty()
  @IsNotEmpty({ message: `${CODES.PASSWORD}.${CODES.MUST_NOT_BE_EMPTY}` })
  @MinLength(6, {
    message: `${CODES.PASSWORD}.${CODES.AT_LEAST_6_CHARACTERS_LONG}`,
  })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    { message: `${CODES.PASSWORD}.${CODES.MUST_MATCH_PASSWORD_REGEX}` },
  )
  password: string;
}
