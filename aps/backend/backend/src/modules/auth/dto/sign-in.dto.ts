import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import CODES from 'src/utils/translation-codes';

export class SignInDto {
  @ApiProperty()
  @IsNotEmpty({ message: `${CODES.EMIAL}.${CODES.MUST_NOT_BE_EMPTY}` })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: `${CODES.PASSWORD}.${CODES.MUST_NOT_BE_EMPTY}` })
  password: string;
}
