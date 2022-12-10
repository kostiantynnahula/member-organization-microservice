import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { OrganizationInput } from './models';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { OrganizationDocument, Organization } from './organization.schema';

@Injectable()
export class OrganizationsService {
  private collection: Map<string, Organization> = new Map();

  constructor(
    @InjectModel(Organization.name)
    private organizationModel: Model<OrganizationDocument>,
  ) {}

  async create(data: Organization): Promise<Organization> {
    const organization = new this.organizationModel(data);
    const res = organization.save();
    return res as unknown as Organization;
  }

  async getOne(_id: string): Promise<Organization> {
    return (await this.organizationModel
      .findOne({ id: _id })
      .exec()) as unknown as Organization;
  }

  async findOneByCreator(creator_id: string): Promise<Organization> {
    const res = (await this.organizationModel
      .findOne({ creator_id })
      .exec()) as unknown as Organization;
    console.log(res, 'res');
    return res;
  }

  async updateOne(
    _id: string,
    data: Partial<Organization>,
  ): Promise<Organization> {
    return (await this.organizationModel.findByIdAndUpdate(
      { id: _id },
      { ...data },
    )) as unknown as Organization;
  }
}
