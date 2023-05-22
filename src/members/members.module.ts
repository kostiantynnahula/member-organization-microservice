import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { OrganizationsModule } from './../organizations/organizations.module';

@Module({
  imports: [OrganizationsModule],
  providers: [MembersService],
  controllers: [MembersController],
})
export class MembersModule {}
