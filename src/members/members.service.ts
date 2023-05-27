import { Injectable } from '@nestjs/common';
import { OrganizationsService } from './../organizations/organizations.service';
import { Member, MemberDocument, Role } from './member.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Organization,
  OrganizationDocument,
} from './../organizations/organization.schema';

@Injectable()
export class MembersService {
  constructor(
    @InjectModel(Organization.name)
    private organizationModel: Model<OrganizationDocument>,
  ) {}

  async editMember(_id: string, orgId: string, role: Role): Promise<void> {
    console.log(orgId);
    const organization = await this.organizationModel.findById<Organization>(
      orgId,
    );

    organization.members = organization.members.map((m) =>
      m._id === _id ? { ...m, role } : m,
    );

    await this.organizationModel.findByIdAndUpdate(orgId, organization);
  }

  async deleteMember(_id: string): Promise<void> {
    // delete member item
  }
}
