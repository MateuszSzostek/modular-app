import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  UseGuards,
  Get,
  Delete,
  Param,
} from '@nestjs/common';
import { ProfileService } from '../services/profile.service';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { GetProfileDto } from '../dto/get-profile.dto';
import { DeleteProfileDto } from '../dto/delete-profile.dto';
import { Response } from 'express';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PROFILE_RESPONSE_CODES } from '../utils';
import { AccessGuard } from 'src/modules/access/guards/resource.guard';
import { Action } from 'src/modules/access/decorators/action.decorator';
import { ACCESS_ACTIONS } from 'src/modules/access/utils/access.actions';

@Controller('api/profiles')
@UseGuards(AccessGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create new profile' })
  @ApiResponse({ status: 201, description: 'New profile created successfully' })
  @ApiBody({ type: CreateProfileDto })
  @UseGuards(AuthGuard)
  @Action(ACCESS_ACTIONS.CREATE_PROFILE)
  async createProfile(
    @Body() createProfileDto: CreateProfileDto,
    @Res() res: Response,
  ) {
    const profile = await this.profileService.createProfile(
      createProfileDto?.name,
      createProfileDto?.avatar,
    );

    if (!profile) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        messages: [PROFILE_RESPONSE_CODES.PROFILE_NOT_CREATED],
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    return res.status(HttpStatus.CREATED).json({
      messages: [PROFILE_RESPONSE_CODES.PROFILE_CREATED_SUCCESSFULLY],
      statusCode: HttpStatus.CREATED,
    });
  }

  @Get(':profileId')
  @ApiOperation({ summary: 'Get profile' })
  @ApiResponse({ status: 200, description: 'Profile returned successfully' })
  @ApiBody({ type: GetProfileDto })
  @UseGuards(AuthGuard)
  @Action(ACCESS_ACTIONS.VIEW_PROFILE)
  async getProfile(
    @Param('profileId') profileId: string,
    @Res() res: Response,
  ) {
    const isExistingProfile =
      await this.profileService.doesProfileExists(profileId);

    if (!isExistingProfile) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        messages: [PROFILE_RESPONSE_CODES.PROFILE_NOT_EXISTS],
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    const profile = await this.profileService.getProfile(profileId);

    return res.status(HttpStatus.OK).json({
      messages: [PROFILE_RESPONSE_CODES.PROFILE_RETURNED_SUCCESSFULLY],
      statusCode: HttpStatus.OK,
      data: profile,
    });
  }

  @Post('update')
  @ApiOperation({ summary: 'Updated profile' })
  @ApiResponse({ status: 200, description: 'Profile updated successfully' })
  @ApiBody({ type: UpdateProfileDto })
  @UseGuards(AuthGuard)
  @Action(ACCESS_ACTIONS.EDIT_PROFILE)
  async updateProfile(
    @Body() updateProfileDto: UpdateProfileDto,
    @Res() res: Response,
  ) {
    const isExistingProfile = await this.profileService.doesProfileExists(
      updateProfileDto?.id,
    );

    if (!isExistingProfile) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        messages: [PROFILE_RESPONSE_CODES.PROFILE_NOT_EXISTS],
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    const updatedProfile = await this.profileService.updateProfile(
      updateProfileDto?.id,
      updateProfileDto?.name,
      updateProfileDto?.avatar,
    );

    return res.status(HttpStatus.OK).json({
      messages: [PROFILE_RESPONSE_CODES.PROFILE_UPDATED_SUCCESSFULLY],
      statusCode: HttpStatus.OK,
      data: updatedProfile,
    });
  }

  @Delete('delete')
  @UseGuards(AuthGuard)
  @Action(ACCESS_ACTIONS.DELETE_PROFILE)
  async deleteProfile(
    @Body() deleteProfileDto: DeleteProfileDto,
    @Res() res: Response,
  ) {
    const isExistingProfile = await this.profileService.doesProfileExists(
      deleteProfileDto?.id,
    );

    if (!isExistingProfile) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        messages: [PROFILE_RESPONSE_CODES.PROFILE_NOT_EXISTS],
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    const isProfileDeleted = await this.profileService.deleteProfile(
      deleteProfileDto?.id,
    );

    if (!isProfileDeleted) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        messages: [PROFILE_RESPONSE_CODES.PROFILE_NOT_DELETED],
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    return res.status(HttpStatus.OK).json({
      messages: [PROFILE_RESPONSE_CODES.PROFILE_DELETED_SUCCESSFULLY],
      statusCode: HttpStatus.OK,
    });
  }
}
