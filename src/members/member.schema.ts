import { Prop } from '@nestjs/mongoose';

export class Member {
  @Prop()
  _id: string;

  @Prop()
  username: string;

  @Prop()
  email: string;
}
