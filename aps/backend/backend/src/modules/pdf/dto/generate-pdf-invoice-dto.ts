import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsObject, IsString, MinLength } from 'class-validator';

export class GeneratePdfInvoiceDto {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  receiverName:string

  @ApiProperty()
  @IsString()
  receiverStreetName: string

  @ApiProperty()
  @IsString()
  receiverHouseNumber:string

  @ApiProperty()
  @IsString()
  receiverPostCode:string

  @ApiProperty()
  @IsNumber()
  paymentDays:number

  @ApiProperty()
  @IsDate()
  paymentDate:Date

  @ApiProperty()
  @IsDate()
  issueDate:Date

  @ApiProperty()
  @IsString()
  description:string

  @ApiProperty()
  @IsObject()
  items: {
    name:string
    unit:string
    amount:number
    vatPrice:number
    vatRate:string
    netPrice:number
    grossProce:number
  }[] 
}