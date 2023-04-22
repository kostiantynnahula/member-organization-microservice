import { Prop } from '@nestjs/mongoose';

export enum Role {
  CREATOR = 'CREATOR',
  MEMBER = 'MEMBER',
}

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
