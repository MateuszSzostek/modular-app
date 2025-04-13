import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UploadImageDto } from '../dto/upload-image.dto';
import { UploadVideoDto } from '../dto/upload-video.dto';
import { UploadAvatarDto } from '../dto/upload-avatar.dto';

import { Response, Request } from 'express';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { FileUploaderService } from '../services/file-uploader.service.dto';

@Controller('upload')
export class FileUploaderController {
  constructor(private readonly fileUploaderService: FileUploaderService) {}

  @Post('image')
  @UseGuards(AuthGuard)
  async uploadImage(
    @Body() uploadImageDto: UploadImageDto,
    @Res() res: Response,
  ) {
    await this.fileUploaderService.uploadImage(uploadImageDto);
    res.status(HttpStatus.CREATED);
  }

  @Post('video')
  @UseGuards(AuthGuard)
  async uploadVideo(
    @Body() uploadVideoDto: UploadVideoDto,
    @Res() res: Response,
  ) {
    await this.fileUploaderService.uploadVideo(uploadVideoDto);
    // res.cookie('auth_token', accessToken, { httpOnly: true, secure: true });
    res.status(HttpStatus.FOUND);
  }

  @Post('avatar')
  @UseGuards(AuthGuard)
  async uploadAvatar(
    @Body() uploadAvatarDto: UploadAvatarDto,
    @Res() res: Response,
  ) {
    await this.fileUploaderService.uploadAvatar(uploadAvatarDto);
    res.status(HttpStatus.OK);
  }
}
