import { Injectable } from '@nestjs/common';
import { Member, Role } from './member.schema';
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

  async editMember(
    _id: string,
    orgId: string,
    role: Role,
  ): Promise<Organization> {
    const organization = await this.organizationModel.findById<Organization>(
      orgId,
    );

    organization.members = organization.members.map((m) =>
      m._id === _id ? { ...m, role } : m,
    );

    await this.organizationModel.findByIdAndUpdate(orgId, organization);

    return organization;
  }

  async deleteMember(_id: string, orgId: string): Promise<Organization> {
    const organization = await this.organizationModel.findById<Organization>(
      orgId,
    );
    organization.members = organization.members.filter((m) => m._id !== _id);

    await this.organizationModel.findByIdAndUpdate(orgId, organization);

    return organization;
  }

  async addMember(
    member: Omit<Member, 'role'>,
    orgId: string,
  ): Promise<Organization> {
    const organization = await this.organizationModel.findById<Organization>(
      orgId,
    );

    organization.members = [
      ...organization.members,
      { ...member, role: Role.MEMBER },
    ];

    await this.organizationModel.findByIdAndUpdate(orgId, organization);

    return organization;
  }
}
