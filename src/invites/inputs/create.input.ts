import { IsDefined, IsNotEmpty } from 'class-validator';
import { Member } from './../../members/inputs/member.input';
import { Organization } from './../../organizations/organization.schema';
import { InviteType, InviteStatus } from './../invite.schema';

export class CreateInviteInput {
  @IsDefined()
  @IsNotEmpty()
  organization: Organization;

  @IsDefined()
  from: Member;

  @IsDefined()
  to: Member;

  @IsDefined()
  type: InviteType;

  @IsDefined()
  status: InviteStatus;
}
