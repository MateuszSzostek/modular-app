import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AccessGuard } from './guards/resource.guard';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileSchema } from '../profile/models/profile.model';
import { AccessControlService } from './services/access-control.service';
import {
  AccessControlDataSchema,
  AccessControlData,
} from './models/access.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'AccessDataSchema', schema: AccessControlDataSchema },
    ]),
    UserModule,
    MongooseModule.forFeature([
      { name: 'ProfileSchema', schema: ProfileSchema },
    ]),
    //MongooseModule.forFeature([{ name: 'profile', schema: ProfileSchema }]),
  ],
  providers: [AccessGuard, AccessControlService],
  exports: [AccessControlService], // Export if needed by other modules
})
export class AccessControlModule {}
