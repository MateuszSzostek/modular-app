import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import CODES from 'src/utils/translation-codes';

export class ForgotPasswordDto {
  @ApiProperty()
  @IsEmail({}, { message: `${CODES.EMIAL}.${CODES.MUST_BE_AN_EMAIL}` })
  @IsNotEmpty({ message: `${CODES.EMIAL}.${CODES.MUST_NOT_BE_EMPTY}` })
  email: string;
}
