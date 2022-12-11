import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Member } from './../members/member.schema';

export type OrganizationDocument = HydratedDocument<SchemaFactory>;

@Schema({
  _id: true,
  timestamps: true,
})
export class Organization {
  _id?: string;

  @Prop({
    trim: true,
    maxlength: 255,
    required: true,
  })
  name: string;

  @Prop({
    trim: true,
  })
  description: string;

  @Prop({
    trim: true,
    required: true,
    maxlength: 255,
  })
  creator_id: string;

  @Prop()
  members: Member[];
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
