import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrganizationsService } from './organizations.service';
import { CreateOrganizationInput } from './inputs/create.input';
import { UpdateOrganizationInput } from './inputs/update.input';

@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly organizationService: OrganizationsService) {}

  @MessagePattern({
    entity: 'organization',
    cmd: 'create',
  })
  async createItem(@Payload() payload: CreateOrganizationInput) {
    return await this.organizationService.create({ ...payload, members: [] });
  }

  @MessagePattern({
    entity: 'organization',
    cmd: 'get-by-creator',
  })
  async getByCreator(creator_id: string) {
    return await this.organizationService.findOneByCreator(creator_id);
  }

  @MessagePattern({
    entity: 'organization',
    cmd: 'get-one',
  })
  async getItem(_id: string) {
    console.log('get one');
    return await this.organizationService.getOne(_id);
  }

  @MessagePattern({
    entity: 'organization',
    cmd: 'update',
  })
  async updateItem(@Payload() payload: UpdateOrganizationInput) {
    const { _id, ...data } = payload;
    return await this.organizationService.updateOne(_id, data);
  }
}
