import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, MinLength } from 'class-validator';

export class GetCommentDto {
  @ApiProperty()
    @IsString()
    @IsUUID()
    @IsNotEmpty()
    id: string;
}