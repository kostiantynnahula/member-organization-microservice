import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { OrganizationDocument, Organization } from './organization.schema';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectModel(Organization.name)
    private organizationModel: Model<OrganizationDocument>,
  ) {}

  async create(data: Organization): Promise<Organization> {
    const organization = new this.organizationModel(data);
    const res = organization.save();
    return res as unknown as Organization;
  }

  async getOne(_id: string, member_id: string): Promise<Organization> {
    return (await this.organizationModel
      .findOne({ id: _id, members: { $elemMatch: { _id: member_id } } })
      .exec()) as unknown as Organization;
  }

  async getOrganizationById(_id: string): Promise<Organization> {
    return (await this.organizationModel.findById(
      _id,
    )) as unknown as Organization;
  }

  async findByMember(member_id: string) {
    return (await this.organizationModel
      .find({ members: { $elemMatch: { _id: member_id } } })
      .exec()) as unknown as Organization[];
  }

  async updateOne(
    _id: string,
    member_id: string,
    data: Partial<Organization>,
  ): Promise<Organization> {
    return (await this.organizationModel
      .findOneAndUpdate({ id: _id, member_id: member_id }, { ...data })
      .exec()) as unknown as Organization;
  }
}
