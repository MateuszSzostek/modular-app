import {
  Injectable,
} from '@nestjs/common';
import { GetPostDto } from '../dto/get-post.dto';
import { CreatePostDto } from '../dto/create-post.dto';
import { DeletePostDto } from '../dto/delete-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';

@Injectable()
export class PostService {

  async createPost(createPosteDto:CreatePostDto) {

    //TODO - logic to create post in database

    //throw new BadRequestException("")
   // return {message: INVOICE_RESPONSE_CODES.INVOICE_CREATED_SUCCESSFULLY}
  }

  async getPost(getProfileDto: GetPostDto) {
    //const { id } = getProfileDto;

    //TODO implement to get post from database
    // Check if the user already exists
    //if (users.//find((user) => user.email === email)) {
     // throw new BadRequestException('Email already in use');
    //}

   // return { message: INVOICE_RESPONSE_CODES.INVOICE_RETURNED_SUCCESSFULLY }
  }

  async updatePost(updateInvoiceDto: UpdatePostDto) {
   //TODO - implement logic to update post in database

    // const user = users.find((user) => user.email === email);

    //if (!user || !(await this.validatePassword(password, user.passwordHash))) {
     // throw new UnauthorizedException('Invalid credentials');
    //}

   // con//st token = this.jwtService.sign({ id: user.id, email: user.email });

    //res.cookie('auth_token', token, { httpOnly: true, secure: true });
   // return { message: INVOICE_RESPONSE_CODES.INVOICE_UPDATED_SUCCESSFULLY };
  }

  async deletePost(deletePostDto: DeletePostDto) {
    //TODO - implement-logic to delete post from database
   // return {message: INVOICE_RESPONSE_CODES.INVOICE_DELETED_SUCCESSFULLY}
  }

}
