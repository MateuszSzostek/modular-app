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
import { AddCommentDto } from '../dto/add-comment.dto';
import { EditCommentDto } from '../dto/edit-comment.dto';
import { DeleteCommentDto } from '../dto/delete-comment.dto';
import { GetCommentDto } from '../dto/get-comment.dto';

import { Response, Request } from 'express';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { CommentService } from '../services/comment.service';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('add')
  @UseGuards(AuthGuard)
  async addComment(
    @Body() addCommentDto: AddCommentDto,
    @Res() res: Response,
  ) {
    const comment = await this.commentService.addComment(addCommentDto);
    res.status(HttpStatus.CREATED).json(comment);
  }

  @Get('')
  @UseGuards(AuthGuard)
  async getComment(@Body() getCommentDto: GetCommentDto, @Res() res: Response) {
    const comment = await this.commentService.getComment(getCommentDto);
    // res.cookie('auth_token', accessToken, { httpOnly: true, secure: true });
    res.status(HttpStatus.FOUND).json(comment);
  }

  @Post('edit')
  @UseGuards(AuthGuard)
  async editComment(
    @Body() editCommentDto: EditCommentDto,
    @Res() res: Response,
  ) {
    await this.commentService.editComment(editCommentDto);
    res.status(HttpStatus.OK);
  }

  @Delete('delete')
  @UseGuards(AuthGuard)
  async deleteComment(
    @Body() deleteCommentDto: DeleteCommentDto,
    @Res() res: Response,
  ) {
    await this.commentService.deleteComment(deleteCommentDto);
    res.status(HttpStatus.OK);
  }
}
