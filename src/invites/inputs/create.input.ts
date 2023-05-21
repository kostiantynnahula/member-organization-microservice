import { IsDefined, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateInviteInput {
  @IsDefined()
  @IsNotEmpty()
  orgId: string;

  @IsDefined()
  @IsEmail()
  from: string;

  @IsDefined()
  @IsEmail()
  to: string;
}
