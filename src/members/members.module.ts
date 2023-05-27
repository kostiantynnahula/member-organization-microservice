import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { OrganizationsModule } from './../organizations/organizations.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Member, MemberSchema } from './member.schema';
import {
  OrganizationSchema,
  Organization,
} from './../organizations/organization.schema';

@Module({
  imports: [
    OrganizationsModule,
    MongooseModule.forFeature([
      {
        name: Member.name,
        schema: MemberSchema,
      },
      {
        name: Organization.name,
        schema: OrganizationSchema,
      },
    ]),
  ],
  providers: [MembersService],
  controllers: [MembersController],
})
export class MembersModule {}
