import { IsOptional, IsNotEmpty, IsDefined } from 'class-validator';

export class UpdateOrganizationInput {
  @IsDefined()
  _id: string;

  @IsOptional()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsNotEmpty()
  description: string;

  @IsDefined()
  member_id: string;
}
