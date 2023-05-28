import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  MailGetMany,
  SendMailInvite,
} from './../interfaces/services/mail.interfaces';

@Injectable()
export class MailService {
  constructor(
    @Inject('MAIL_MICROSERVICE') private readonly client: ClientProxy,
  ) {}

  getMailLogs(payload: MailGetMany) {
    return this.client.send(
      {
        entity: 'mail-logs',
        cmd: 'get-many',
      },
      payload,
    );
  }

  getMailLog(_id: string) {
    return this.client.send(
      {
        entity: 'mail-logs',
        cmd: 'get-one',
      },
      _id,
    );
  }

  organizationInvite(payload: SendMailInvite) {
    return this.client.send(
      {
        entity: 'mails',
        cmd: 'org-invite',
      },
      payload,
    );
  }
}
