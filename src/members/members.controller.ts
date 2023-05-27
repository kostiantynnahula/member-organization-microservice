import { Controller } from '@nestjs/common';
import { MembersService } from './members.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MemberEditInput } from './inputs/member-edit.input';

@Controller('members')
export class MembersController {
  constructor(private readonly memberService: MembersService) {}

  @MessagePattern({
    entity: 'organization-member',
    cmd: 'update',
  })
  async editOne(@Payload() payload: MemberEditInput) {
    const { memberId, role, organizationId } = payload;
    await this.memberService.editMember(memberId, organizationId, role);
    return true;
  }

  @MessagePattern({
    entity: 'member',
    cmd: 'delete',
  })
  async deleteOne() {
    // delete member item
  }
}
