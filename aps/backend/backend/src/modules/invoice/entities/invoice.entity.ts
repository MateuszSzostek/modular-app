import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type InvoiceDocument = Invoice & Document;

@Schema()
export class Invoice {
  @Prop({ required: true })
  id: string;

  receiverName: string
  receiverStreetName: string
  receiverHouseNumber: string
  receiverPostCode:string
  paymentDays:number 
  paymentDate:Date
  issueDate:Date
  description:string
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

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);

