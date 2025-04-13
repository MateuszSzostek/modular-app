import { ApiProperty } from '@nestjs/swagger';
import {  IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdateProfileDto {

  @IsString()
  @IsNotEmpty()
  id:string

  @ApiProperty()
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  name: string;
}