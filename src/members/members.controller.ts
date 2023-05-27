import { Controller } from '@nestjs/common';
import { MembersService } from './members.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MemberEditInput } from './inputs/member-edit.input';
import { MemberDeleteInput } from './inputs/member-delete.input';

@Controller('members')
export class MembersController {
  constructor(private readonly memberService: MembersService) {}

  @MessagePattern({
    entity: 'organization-member',
    cmd: 'update',
  })
  async editOne(@Payload() payload: MemberEditInput) {
    const { memberId, role, organizationId } = payload;
    return await this.memberService.editMember(memberId, organizationId, role);
  }

  @MessagePattern({
    entity: 'organization-member',
    cmd: 'delete',
  })
  async deleteOne(@Payload() payload: MemberDeleteInput) {
    const { memberId, organizationId } = payload;
    return await this.memberService.deleteMember(memberId, organizationId);
  }
}
