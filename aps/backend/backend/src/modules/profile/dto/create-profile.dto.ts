import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import CODES from 'src/utils/translation-codes';

export class CreateProfileDto {
  @ApiProperty()
  @IsString({ message: `${CODES.PROFILE_NAME}.${CODES.MUST_BE_A_STRING}` })
  @MinLength(3, {
    message: `${CODES.PROFILE_NAME}.${CODES.AT_LEAST_3_CHARACTERS_LONG}`,
  })
  @IsNotEmpty({ message: `${CODES.PROFILE_NAME}.${CODES.MUST_NOT_BE_EMPTY}` })
  name: string;

  @ApiProperty()
  @IsString({ message: `${CODES.PROFILE_AVATAR}.${CODES.MUST_BE_A_STRING}` })
  avatar: string;
}
