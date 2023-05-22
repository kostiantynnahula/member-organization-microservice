import { Injectable } from '@nestjs/common';
import { OrganizationsService } from './../organizations/organizations.service';

@Injectable()
export class MembersService {
  constructor(private readonly organizationService: OrganizationsService) {}

  async editMember() {
    // edit member item
  }

  async deleteMember() {
    // delete member item
  }
}
