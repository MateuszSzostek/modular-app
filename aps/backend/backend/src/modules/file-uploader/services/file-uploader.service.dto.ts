import { Injectable } from '@nestjs/common';
import { UploadImageDto } from '../dto/upload-image.dto';
import { UploadVideoDto } from '../dto/upload-video.dto';
import { UploadAvatarDto } from '../dto/upload-avatar.dto';

@Injectable()
export class FileUploaderService {
  async uploadImage(uploadImageDto: UploadImageDto) {
    //TODO - logic to upload image to serversrc/modules/file-uploader/dto/upload-avatar.dto.ts
    //throw new BadRequestException("")
    // return {message: INVOICE_RESPONSE_CODES.INVOICE_CREATED_SUCCESSFULLY}
  }

  async uploadVideo(uploadVideoDto: UploadVideoDto) {
    //const { id } = getProfileDto;
    //TODO implement to upload video dto
    // Check if the user already exists
    //if (users.//find((user) => user.email === email)) {
    // throw new BadRequestException('Email already in use');
    //}
    // return { message: INVOICE_RESPONSE_CODES.INVOICE_RETURNED_SUCCESSFULLY }
  }

  async uploadAvatar(uploadAvatarDto: UploadAvatarDto) {
    //TODO - implement logic to upload avarach to disk
    // const user = users.find((user) => user.email === email);
    //if (!user || !(await this.validatePassword(password, user.passwordHash))) {
    // throw new UnauthorizedException('Invalid credentials');
    //}
    // con//st token = this.jwtService.sign({ id: user.id, email: user.email });
    //res.cookie('auth_token', token, { httpOnly: true, secure: true });
    // return { message: INVOICE_RESPONSE_CODES.INVOICE_UPDATED_SUCCESSFULLY };
  }
}
