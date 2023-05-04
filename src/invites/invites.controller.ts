import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { InvitesService } from './invites.service';
import { CreateInviteInput } from './inputs/create.input';
import { UpdateInviteInput } from './inputs/update.input';
import { GetByEmail } from './inputs/get-by-email.input';
import { RandomGenerator } from './../utils/helpers/RandomGenerator';
import { MailService } from './../utils/services/mail.service';

@Controller('invites')
export class InvitesController {
  constructor(
    private readonly invitesService: InvitesService,
    private readonly mailService: MailService,
  ) {}

  @MessagePattern({
    entity: 'invite',
    cmd: 'create-one',
  })
  async createOne(@Payload() payload: CreateInviteInput) {
    const token = RandomGenerator.generateString(10);
    const secret = RandomGenerator.generateString(10);
    const invite = await this.invitesService.createOne({
      ...payload,
      token,
      secret,
    });
    if (invite) {
      await this.mailService.sendInvite({
        email: payload.email,
        token,
        secret,
      });
    }
  }

  @MessagePattern({
    entity: 'invite',
    cmd: 'update-one',
  })
  async updateOne(@Payload() payload: UpdateInviteInput) {
    const { _id, status } = payload;
    return await this.invitesService.updateOne(_id, { status });
  }

  @MessagePattern({
    entity: 'invite',
    cmd: 'get-one',
  })
  async getOne(_id: string) {
    return await this.invitesService.getOne(_id);
  }

  @MessagePattern({
    entity: 'invite',
    cmd: 'get-by-email',
  })
  async getOneByIdAndEmail(@Payload() payload: GetByEmail) {
    const { _id, email } = payload;
    return await this.invitesService.getOneByEmail(_id, email);
  }
}
