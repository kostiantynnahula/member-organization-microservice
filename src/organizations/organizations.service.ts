import { Injectable } from '@nestjs/common';
import { Organization, OrganizationInput } from './models';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OrganizationsService {
  private collection: Map<string, Organization> = new Map();

  async create(input: OrganizationInput): Promise<Organization> {
    const _id = uuidv4();
    const data = { _id, ...input };
    this.collection.set(_id, data);
    return data;
  }

  async getOne(_id: string): Promise<Organization> {
    const org = this.collection.get(_id);
    return org;
  }
}
