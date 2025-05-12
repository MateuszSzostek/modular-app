import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AccessGuard } from '../access/guards/resource.guard';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileSchema } from './models/profile.model';
import { ProfileController } from './controllers/profile.controller';
import { AccessControlModule } from '../access/access-control-module.module';
import { AccessControlService } from '../access/services/access-control.service';
import { AccessControlDataSchema } from '../access/models/access.model';
import { JwtService } from '@nestjs/jwt';
import { ProfileService } from './services/profile.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'AccessDataSchema', schema: AccessControlDataSchema },
    ]),
    UserModule,
    MongooseModule.forFeature([
      { name: 'ProfileSchema', schema: ProfileSchema },
    ]),
    AccessControlModule,
    //MongooseModule.forFeature([{ name: 'profile', schema: ProfileSchema }]),
  ],
  providers: [AccessGuard, AccessControlService, JwtService, ProfileService],
  controllers: [ProfileController],
})
export class ProfileModule {}
