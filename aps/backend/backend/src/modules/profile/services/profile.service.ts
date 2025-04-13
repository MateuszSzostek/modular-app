import {
    Injectable,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { CreateProfileDto } from '../dto/create-profile.dto';
  import { GetProfileDto } from '../dto/get-profile.dto';
  import { DeleteProfileDto } from '../dto/delete-profile.dto';
  import { UpdateProfileDto } from '../dto/update-profile.dto';
  import { PROFILE_RESPONSE_CODES } from '../utils';

  
  @Injectable()
  export class ProfileService {
    constructor(private jwtService: JwtService) {}
  
    async createProfile(createProfileDto:CreateProfileDto) {
      const {name} = createProfileDto;
  
      //TODO - logic to create profile in database
  
      //throw new BadRequestException("")
      return {message: PROFILE_RESPONSE_CODES.PROFILE_CREATED_SUCCESSFULLY}
    }
  
    async getProfile(getProfileDto: GetProfileDto) {
      const { id } = getProfileDto;
  
      //TODO implement login to get profile from database
      // Check if the user already exists
      //if (users.//find((user) => user.email === email)) {
       // throw new BadRequestException('Email already in use');
      //}
  
      return { message: PROFILE_RESPONSE_CODES.PROFILE_RETURNED_SUCCESSFULLY }
    }
  
    async updateProfile(updateProfileDto: UpdateProfileDto) {
     //TODO - implement logic to update profile in database
  
      // const user = users.find((user) => user.email === email);
  
      //if (!user || !(await this.validatePassword(password, user.passwordHash))) {
       // throw new UnauthorizedException('Invalid credentials');
      //}
  
     // con//st token = this.jwtService.sign({ id: user.id, email: user.email });
  
      //res.cookie('auth_token', token, { httpOnly: true, secure: true });
      return { message: PROFILE_RESPONSE_CODES.PROFILE_UPDATED_SUCCESFULLY };
    }
  
    async deleteProfile(deleteProfileDto: DeleteProfileDto) {
      //TODO - implement-logic to delete profile from database
    }
  
  }
  