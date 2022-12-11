import { IsDefined, IsNotEmpty } from 'class-validator';
import { InviteStatus } from '../invite.schema';

export class UpdateInviteInput {
  @IsDefined()
  @IsNotEmpty()
  _id: string;

  @IsDefined()
  status: InviteStatus;
}
