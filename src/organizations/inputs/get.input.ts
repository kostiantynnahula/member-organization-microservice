import { IsDefined } from 'class-validator';

export class GetOrganizationInput {
  @IsDefined()
  _id: string;

  @IsDefined()
  member_id: string;
}
