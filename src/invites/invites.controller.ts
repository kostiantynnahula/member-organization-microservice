import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { InvitesService } from './invites.service';
import { CreateInviteInput } from './inputs/create.input';
import { UpdateInviteInput } from './inputs/update.input';
import { RandomGenerator } from './../utils/helpers/RandomGenerator';
import { OrganizationsService } from './../organizations/organizations.service';
import { InviteStatus } from './invite.schema';

@Controller('invites')
export class InvitesController {
  constructor(
    private readonly invitesService: InvitesService,
    private readonly organizationService: OrganizationsService,
  ) {}

  @MessagePattern({
    entity: 'invite',
    cmd: 'create-one',
  })
  async createOne(@Payload() payload: CreateInviteInput) {
    const token = RandomGenerator.generateString(10);
    const secret = RandomGenerator.generateString(10);
    const organization = await this.organizationService.getOrganizationById(
      payload.orgId,
    );

    if (!organization) {
      throw new Error('Organization not found');
    }

    const invite = await this.invitesService.createOne({
      ...payload,
      token,
      secret,
      organization,
      status: InviteStatus.PENDING,
    });

    return invite;
  }

  @MessagePattern({
    entity: 'invite',
    cmd: 'update-one',
  })
  async updateOne(@Payload() payload: UpdateInviteInput) {
    const { _id, status } = payload;
    return await this.invitesService.updateOne(_id, { status });
  }

  @MessagePattern({
    entity: 'invite',
    cmd: 'get-one',
  })
  async getOne(_id: string) {
    return await this.invitesService.getOne(_id);
  }

  @MessagePattern({
    entity: 'invite',
    cmd: 'get-org-invites',
  })
  async getOrgInvites(_id: string) {
    return await this.invitesService.getListByOrgId(_id);
  }
}
