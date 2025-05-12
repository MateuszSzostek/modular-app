import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import CODES from 'src/utils/translation-codes';

export class DeleteProfileDto {
  @ApiProperty()
  @IsNotEmpty({ message: `${CODES.PROFILE_ID}.${CODES.MUST_NOT_BE_EMPTY}` })
  @IsString({ message: `${CODES.PROFILE_ID}.${CODES.MUST_BE_A_STRING}` })
  id: string;
}
