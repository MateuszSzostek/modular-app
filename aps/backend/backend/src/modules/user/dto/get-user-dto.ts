import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}