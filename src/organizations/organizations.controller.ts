import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, Ctx } from '@nestjs/microservices';
import { OrganizationInput } from './models';
import { OrganizationsService } from './organizations.service';

@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly organizationService: OrganizationsService) {}

  @MessagePattern({
    entity: 'organization',
    cmd: 'create',
  })
  async createItem(@Payload() payload: OrganizationInput) {
    return await this.organizationService.create(payload);
  }

  @MessagePattern({
    entity: 'organization',
    cmd: 'get-one',
  })
  async getItem(_id: string) {
    return await this.organizationService.getOne(_id);
  }
}
