import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Member } from './../members/member.schema';
import { Organization } from './../organizations/organization.schema';
import { Transform, Type } from 'class-transformer';

export enum InviteType {
  ORGANIZATION = 'ORGANIZATION',
  EVENT = 'EVENT',
}

export enum InviteStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

export type InviteDocument = HydratedDocument<SchemaFactory>;

@Schema({
  _id: true,
  timestamps: true,
})
export class Invite {
  @Transform(({ value }) => value.toString())
  _id?: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Organization.name,
    required: true,
  })
  @Type(() => Organization)
  organization: Organization;

  @Prop({
    required: true,
  })
  from: Member;

  @Prop({
    required: true,
  })
  to: Member;

  @Prop({
    enum: InviteType,
  })
  type: InviteType;

  @Prop({
    enum: InviteStatus,
  })
  status: InviteStatus;
}

export const InviteSchema = SchemaFactory.createForClass(Invite);
