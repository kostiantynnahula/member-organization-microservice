import { Module } from '@nestjs/common';
import { InvitesService } from './invites.service';
import { InvitesController } from './invites.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Invite, InviteSchema } from './invite.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
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
  providers: [InvitesService],
  controllers: [InvitesController],
})
export class InvitesModule {}
