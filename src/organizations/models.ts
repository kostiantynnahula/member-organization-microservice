export interface Organization {
  _id: string;
  name: string;
  description: string;
}

export type OrganizationInput = Omit<Organization, '_id'>;
