import { IsOptional, IsNotEmpty, IsDefined } from 'class-validator';
import { Member } from './../../members/inputs/member.input';

export class UpdateOrganizationInput {
  @IsDefined()
  _id: string;

  @IsOptional()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  members: Member[];
}
