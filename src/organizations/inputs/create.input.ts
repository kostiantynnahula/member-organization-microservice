import { IsDefined, MaxLength, IsNotEmpty } from 'class-validator';

export class CreateOrganizationInput {
  @IsDefined()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsDefined()
  description: string;

  @IsDefined()
  @IsNotEmpty()
  @MaxLength(255)
  creator_id: string;
}
