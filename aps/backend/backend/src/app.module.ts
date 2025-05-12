import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { MailService } from './modules/mail/services/mail.service';
import { MailModule } from './modules/mail/mail.module';
import { ProfileModule } from './modules/profile/profile.module';
import { AccessControlModule } from './modules/access/access-control-module.module';

@Module({
  imports: [
    MailModule,
    UserModule,
    AuthModule,
    ProfileModule,
    AccessControlModule,
    MongooseModule.forRoot(
      'mongodb://admin:admin123@localhost:27017/session-auth?authSource=admin',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
