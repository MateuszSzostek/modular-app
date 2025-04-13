import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthService } from './services/auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { SessionSerializer } from './session.serializer';
import { AuthController } from './controllers/auth.controller';
import { AuthGuard } from './guards/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from '../user/services/user.service';
import { UserSchema } from '../user/models/user.model';
import { MongooseModule } from '@nestjs/mongoose';
import { UserAuthDataSchema } from './models/auth.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'UserAuthDataSchema', schema: UserAuthDataSchema },
    ]),
    MongooseModule.forFeature([{ name: 'user', schema: UserSchema }]),
    UserModule,
    PassportModule.register({ session: true }),
    JwtModule.register({
      secret: 'yourSecretKey',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [
    AuthService,
    UserService,
    LocalStrategy,
    SessionSerializer,
    AuthGuard,
  ],
  controllers: [AuthController],
  exports: [AuthGuard, AuthService],
})
export class AuthModule {}
