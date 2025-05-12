import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import CODES from 'src/utils/translation-codes';

export class GetProfileDto {
  @ApiProperty()
  @IsString({ message: `${CODES.PROFILE_ID}.${CODES.MUST_BE_A_STRING}` })
  @IsNotEmpty({ message: `${CODES.PROFILE_ID}.${CODES.MUST_NOT_BE_EMPTY}` })
  id: string;
}
