import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OrganizationDocument = HydratedDocument<SchemaFactory>;

@Schema({
  _id: true,
  timestamps: true,
})
export class Organization {
  _id?: string;

  @Prop()
  name: string;

  @Prop()
  description: string;
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
