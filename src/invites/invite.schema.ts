import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
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
    required: false,
  })
  @Type(() => Organization)
  organization: Organization;

  @Prop({
    required: true,
  })
  from: string;

  @Prop({
    required: true,
  })
  to: string;

  @Prop({
    enum: InviteType,
    required: true,
  })
  type: InviteType;

  @Prop({
    enum: InviteStatus,
    default: InviteStatus.PENDING,
  })
  status: InviteStatus;
}

export const InviteSchema = SchemaFactory.createForClass(Invite);
