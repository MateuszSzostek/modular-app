import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProfileDocument = Profile & Document;

@Schema()
export class Profile {
  @Prop({ required: true })
  id: string;

  @Prop({required: true})
  name: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
