import { IsDefined, IsString } from 'class-validator';
import { Member } from './member.input';

export class MemberAddInput {
  @IsDefined()
  @IsString()
  organizationId: string;

  @IsDefined()
  member: Member;
}
