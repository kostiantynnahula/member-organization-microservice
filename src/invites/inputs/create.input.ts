import { IsDefined, IsEmail, IsNotEmpty } from 'class-validator';
import { Organization } from './../../organizations/organization.schema';
import { InviteType, InviteStatus } from './../invite.schema';

export class CreateInviteInput {
  @IsDefined()
  @IsNotEmpty()
  organization: Organization;

  @IsDefined()
  @IsEmail()
  from: string;

  @IsDefined()
  @IsEmail()
  to: string;

  @IsDefined()
  type: InviteType;

  @IsDefined()
  status?: InviteStatus;
}
