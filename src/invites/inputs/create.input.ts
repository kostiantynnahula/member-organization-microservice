import { IsDefined, IsEmail, IsNotEmpty } from 'class-validator';
import { Organization } from './../../organizations/organization.schema';
import { InviteStatus } from './../invite.schema';

export class CreateInviteInput {
  @IsDefined()
  @IsNotEmpty()
  organization: Organization;

  @IsDefined()
  @IsEmail()
  email: string;

  @IsDefined()
  status?: InviteStatus;
}
