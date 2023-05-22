import { Controller } from '@nestjs/common';
import { MembersService } from './members.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('members')
export class MembersController {
  constructor(private readonly memberService: MembersService) {}

  @MessagePattern({
    entity: 'member',
    cmd: 'edit',
  })
  async editOne() {
    // edit member item
  }

  @MessagePattern({
    entity: 'member',
    cmd: 'delete',
  })
  async deleteOne() {
    // delete member item
  }
}
