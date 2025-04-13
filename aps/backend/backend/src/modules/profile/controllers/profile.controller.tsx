import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  UseGuards,
  Get,
  Delete,
} from '@nestjs/common';
import { ProfileService } from '../services/profile.service';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { GetProfileDto } from '../dto/get-profile.dto';
import { DeleteProfileDto } from '../dto/delete-profile.dto';
import { Response, Request } from 'express';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post('create')
  @UseGuards(AuthGuard)
  async createProfile(
    @Body() createProfileDto: CreateProfileDto,
    @Res() res: Response,
  ) {
    const profile = await this.profileService.createProfile(createProfileDto);
    res.status(HttpStatus.CREATED).json(profile);
  }

  @Get('')
  @UseGuards(AuthGuard)
  async getProfile(@Body() getProfileDto: GetProfileDto, @Res() res: Response) {
    const profile = await this.profileService.getProfile(getProfileDto);
    // res.cookie('auth_token', accessToken, { httpOnly: true, secure: true });
    res.status(HttpStatus.FOUND).json(profile);
  }

  @Post('update')
  @UseGuards(AuthGuard)
  async updateProfile(
    @Body() updateProfileDto: UpdateProfileDto,
    @Res() res: Response,
  ) {
    await this.profileService.updateProfile(updateProfileDto);
    res.status(HttpStatus.OK);
  }

  @Delete('delete')
  @UseGuards(AuthGuard)
  async deleteProfile(
    @Body() deleteProfileDto: DeleteProfileDto,
    @Res() res: Response,
  ) {
    await this.profileService.deleteProfile(deleteProfileDto);
    res.status(HttpStatus.OK);
  }
}
