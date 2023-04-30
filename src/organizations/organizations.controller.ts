import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrganizationsService } from './organizations.service';
import { CreateOrganizationInput } from './inputs/create.input';
import { UpdateOrganizationInput } from './inputs/update.input';
import { GetOrganizationInput } from './inputs/get.input';
import { Role } from 'src/members/member.schema';

@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly organizationService: OrganizationsService) {}

  @MessagePattern({
    entity: 'organization',
    cmd: 'create',
  })
  async createItem(@Payload() payload: CreateOrganizationInput) {
    const { creator, name, description } = payload;
    return await this.organizationService.create({
      name,
      description,
      members: [{ ...creator, role: Role.CREATOR }],
    });
  }

  @MessagePattern({
    entity: 'organization',
    cmd: 'get-one',
  })
  async getItem(@Payload() payload: GetOrganizationInput) {
    const org = await this.organizationService.getOne(
      payload._id,
      payload.member_id,
    );

    return org;
  }

  @MessagePattern({
    entity: 'organization',
    cmd: 'get-list',
  })
  async getList(member_id: string) {
    return await this.organizationService.findByMember(member_id);
  }

  @MessagePattern({
    entity: 'organization',
    cmd: 'update',
  })
  async updateItem(@Payload() payload: UpdateOrganizationInput) {
    const { _id, member_id, ...data } = payload;
    return await this.organizationService.updateOne(_id, member_id, data);
  }
}
