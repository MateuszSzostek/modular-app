import {
  Injectable,
} from '@nestjs/common';
import { AddCommentDto } from '../dto/add-comment.dto';
import { DeleteCommentDto } from '../dto/delete-comment.dto';
import { EditCommentDto } from '../dto/edit-comment.dto';
import { GetCommentDto } from '../dto/get-comment.dto';

@Injectable()
export class CommentService {

  async addComment(addCommentDto:AddCommentDto) {

    //TODO - logic to add invoice in database

    //throw new BadRequestException("")
    //return {message: INVOICE_RESPONSE_CODES.INVOICE_CREATED_SUCCESSFULLY}
  }

  async getComment(getCommentDto: GetCommentDto) {
    //const { id } = getProfileDto;

    //TODO implement to get comment from database
    // Check if the user already exists
    //if (users.//find((user) => user.email === email)) {
     // throw new BadRequestException('Email already in use');
    //}

  //  return { message: INVOICE_RESPONSE_CODES.INVOICE_RETURNED_SUCCESSFULLY }
  }

  async editComment(editCommentDto: EditCommentDto) {
   //TODO - implement logic to edit comment in database

    // const user = users.find((user) => user.email === email);

    //if (!user || !(await this.validatePassword(password, user.passwordHash))) {
     // throw new UnauthorizedException('Invalid credentials');
    //}

   // con//st token = this.jwtService.sign({ id: user.id, email: user.email });

    //res.cookie('auth_token', token, { httpOnly: true, secure: true });
  //  return { message: INVOICE_RESPONSE_CODES.INVOICE_UPDATED_SUCCESSFULLY };
  }

  async deleteComment(deleteCommentDto: DeleteCommentDto) {
    //TODO - implement-logic to delete commnet from database
  //  return {message: INVOICE_RESPONSE_CODES.INVOICE_DELETED_SUCCESSFULLY}
  }

}
