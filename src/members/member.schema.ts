import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export enum Role {
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
}

export type MemberDocument = HydratedDocument<SchemaFactory>;

export class Member {
  @Prop()
  _id: string;

  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  role: Role;
}

export const MemberSchema = SchemaFactory.createForClass(Member);
