import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, MinLength } from 'class-validator';

export class DeleteCommentDto {
  @ApiProperty()
    @IsString()
    @IsUUID()
    @IsNotEmpty()
    id: string;

}