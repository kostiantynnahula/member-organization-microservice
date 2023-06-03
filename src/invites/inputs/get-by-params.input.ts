import { IsDefined, IsEmail, IsNotEmpty } from 'class-validator';

export class GetInviteByParamsInput {
  @IsDefined()
  @IsNotEmpty()
  secret: string;

  @IsDefined()
  @IsNotEmpty()
  token: string;

  @IsDefined()
  @IsEmail()
  email: string;
}
