import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  surname: string

  @ApiProperty()
  @IsString()
  @IsEmail()
  emailAddress: string

  @ApiProperty()
  @IsString()
  profilePicture: string
}