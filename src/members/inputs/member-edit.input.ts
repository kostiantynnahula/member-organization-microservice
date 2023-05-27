import { IsDefined, IsString } from 'class-validator';
import { Role } from '../member.schema';

export class MemberEditInput {
  @IsDefined()
  @IsString()
  role: Role;

  @IsDefined()
  @IsString()
  organizationId: string;

  @IsDefined()
  @IsString()
  memberId: string;
}
