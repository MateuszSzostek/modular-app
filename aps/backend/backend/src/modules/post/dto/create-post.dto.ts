import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreatePostDto {
  @ApiProperty()
  @IsString()
  @MinLength(1)
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  content:string

  @ApiProperty()
  @IsArray()
  pictures:string[]

  @ApiProperty()
  @IsArray()
  videos:string[]


  @ApiProperty()
  @IsString()
  @MinLength(1)
  @IsNotEmpty()
  authorId:string

}