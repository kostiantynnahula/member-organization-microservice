import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { InviteDocument, Invite } from './invite.schema';
import { CreateInviteInput } from './inputs/create.input';

@Injectable()
export class InvitesService {
  constructor(
    @InjectModel(Invite.name)
    private inviteModel: Model<InviteDocument>,
  ) {}

  async createOne(data: CreateInviteInput): Promise<Invite> {
    const invite = new this.inviteModel(data);
    const res = invite.save();
    return res as unknown as Invite;
  }

  async updateOne(
    _id: string,
    data: Partial<Omit<Invite, '_id'>>,
  ): Promise<Invite> {
    return (await this.inviteModel.findByIdAndUpdate(
      { id: _id },
      { ...data },
    )) as unknown as Invite;
  }

  async getOne(_id: string) {
    return (await this.inviteModel
      .findOne({ id: _id })
      .exec()) as unknown as Invite;
  }

  async getRelatedInvites(member_id: string): Promise<Invite> {
    const res = await this.inviteModel
      .find()
      .or([{ 'from.id': member_id }, { 'to.id': member_id }])
      .exec();
    return res as unknown as Invite;
  }
}
