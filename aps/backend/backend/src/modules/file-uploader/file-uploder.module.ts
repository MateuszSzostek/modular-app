import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from '../auth/guards/auth.guard';
import { FileUploaderService } from './services/file-uploader.service.dto';
import { FileUploaderController } from './controllers/file-uploader.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [FileUploaderService, AuthGuard],
  controllers: [FileUploaderController],
})
export class FileUploaderModule {}
