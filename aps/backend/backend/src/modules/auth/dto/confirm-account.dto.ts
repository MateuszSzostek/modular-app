import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import CODES from 'src/utils/translation-codes';

export class ConfirmAccountDto {
  @ApiProperty()
  @IsNotEmpty({
    message: `${CODES.EMAIL_CONFORMATION_TOKEN}.${CODES.MUST_NOT_BE_EMPTY}`,
  })
  accountConfirmationToken: string;
}
