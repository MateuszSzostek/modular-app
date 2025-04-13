import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString} from 'class-validator';

export class IssueInvoiceDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}