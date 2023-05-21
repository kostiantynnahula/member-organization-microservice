import { Module } from '@nestjs/common';
import { InvitesService } from './invites.service';
import { InvitesController } from './invites.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Invite, InviteSchema } from './invite.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MailService } from './../utils/services/mail.service';
import { OrganizationsModule } from './../organizations/organizations.module';

@Module({
  imports: [
    OrganizationsModule,
    ClientsModule.register([
      {
        name: process.env.MAIL_MICROSERVICE_NAME || 'MAIL_MICROSERVICE',
        transport: Transport.TCP,
        options: {
          port: Number(process.env.MAIL_MICROSERVICE_PORT) || 3002,
        },
      },
    ]),
    MongooseModule.forFeature([
      {
        name: Invite.name,
        schema: InviteSchema,
      },
    ]),
  ],
  providers: [InvitesService, MailService],
  controllers: [InvitesController],
})
export class InvitesModule {}
