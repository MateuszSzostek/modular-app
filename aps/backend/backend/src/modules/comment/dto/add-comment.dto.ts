import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, MinLength } from 'class-validator';

export class AddCommentDto {
  @ApiProperty()
    @IsString()
    @IsUUID()
    @IsNotEmpty()
    relatedToId: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  @IsNotEmpty()
  content: string;
}