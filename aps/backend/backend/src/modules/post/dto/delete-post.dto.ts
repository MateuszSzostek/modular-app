import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString} from 'class-validator';

export class DeletePostDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}