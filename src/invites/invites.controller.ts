import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { InvitesService } from './invites.service';
import { CreateInviteInput } from './inputs/create.input';
import { UpdateInviteInput } from './inputs/update.input';

@Controller('invites')
export class InvitesController {
  constructor(private readonly invitesService: InvitesService) {}

  @MessagePattern({
    entity: 'invite',
    cmd: 'create',
  })
  async createItem(@Payload() payload: CreateInviteInput) {
    return await this.invitesService.createOne(payload);
  }

  @MessagePattern({
    entity: 'invite',
    cmd: 'update',
  })
  async updateItem(@Payload() payload: UpdateInviteInput) {
    const { _id, status } = payload;
    return await this.invitesService.updateOne(_id, { status });
  }

  @MessagePattern({
    entity: 'invite',
    cmd: 'get-related-invites',
  })
  async getInvites(member_id: string) {
    return await this.invitesService.getRelatedInvites(member_id);
  }

  @MessagePattern({
    entity: 'invite',
    cmd: 'get-item',
  })
  async getItem(_id: string) {
    return await this.invitesService.getOne(_id);
  }
}
