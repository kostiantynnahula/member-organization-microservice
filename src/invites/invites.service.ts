import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { InviteDocument, Invite, InviteStatus } from './invite.schema';
import { Organization } from './../organizations/organization.schema';

type CreateInvite = {
  token: string;
  secret: string;
  organization: Organization;
  from: string;
  to: string;
  status: InviteStatus;
};

type InviteByParams = Pick<CreateInvite, 'to' | 'secret' | 'token'>;

@Injectable()
export class InvitesService {
  constructor(
    @InjectModel(Invite.name)
    private inviteModel: Model<InviteDocument>,
  ) {}

  async createOne(data: CreateInvite): Promise<Invite> {
    const invite = new this.inviteModel(data);
    const res = invite.save();
    return res as unknown as Invite;
  }

  async updateOne(
    _id: string,
    data: Partial<Omit<Invite, '_id'>>,
  ): Promise<Invite> {
    return (await this.inviteModel.findByIdAndUpdate(
      _id,
      { ...data },
      {
        returnDocument: 'after',
        lean: true,
      },
    )) as unknown as Invite;
  }

  async getOne(_id: string) {
    return (await this.inviteModel
      .findOne({ id: _id })
      .exec()) as unknown as Invite;
  }

  async getOneByEmail(_id: string, email: string): Promise<Invite> {
    const res = await this.inviteModel.findOne({ email, _id }).exec();
    return res as unknown as Invite;
  }

  async getListByOrgId(_id: string): Promise<Invite[]> {
    return (await this.inviteModel
      .find({
        organization: _id,
      })
      .exec()) as unknown as Invite[];
  }

  async getInviteByParams(params: InviteByParams): Promise<Invite> {
    const { to, secret, token } = params;
    return await this.inviteModel
      .findOne<Invite>({
        to,
        secret,
        token,
      })
      .exec();
  }
}
