import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString} from 'class-validator';

export class GetPostDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}