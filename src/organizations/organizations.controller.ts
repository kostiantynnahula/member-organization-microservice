import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrganizationsService } from './organizations.service';
import { CreateOrganizationInput } from './inputs/create.input';
import { UpdateOrganizationInput } from './inputs/update.input';
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
  async getItem(_id: string) {
    return await this.organizationService.getOne(_id);
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
    const { _id, ...data } = payload;
    // return await this.organizationService.updateOne(_id, data);
  }
}
