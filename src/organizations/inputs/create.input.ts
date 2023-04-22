import { IsDefined, MaxLength, IsNotEmpty } from 'class-validator';
import { Member } from 'src/members/member.schema';

export class CreateOrganizationInput {
  @IsDefined()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsDefined()
  description: string;

  @IsDefined()
  @MaxLength(255)
  creator: Member;
}
