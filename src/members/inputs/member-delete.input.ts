import { IsDefined, IsString } from 'class-validator';

export class MemberDeleteInput {
  @IsDefined()
  @IsString()
  organizationId: string;

  @IsDefined()
  @IsString()
  memberId: string;
}
