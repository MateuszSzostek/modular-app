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
import { CreatePostDto } from '../dto/create-post.dto';
import { GetPostDto } from '../dto/get-post.dto';
import { DeletePostDto } from '../dto/delete-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';

import { Response, Request } from 'express';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { PostService } from '../services/post.services';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('create')
  @UseGuards(AuthGuard)
  async createProfile(
    @Body() createPostDto: CreatePostDto,
    @Res() res: Response,
  ) {
    const post = await this.postService.createPost(createPostDto);
    res.status(HttpStatus.CREATED).json(post);
  }

  @Get('')
  @UseGuards(AuthGuard)
  async getPost(@Body() getPostDto: GetPostDto, @Res() res: Response) {
    const post = await this.postService.getPost(getPostDto);
    // res.cookie('auth_token', accessToken, { httpOnly: true, secure: true });
    res.status(HttpStatus.FOUND).json(post);
  }

  @Post('update')
  @UseGuards(AuthGuard)
  async updatePost(
    @Body() updatePostDto: UpdatePostDto,
    @Res() res: Response,
  ) {
    await this.postService.updatePost(updatePostDto);
    res.status(HttpStatus.OK);
  }

  @Delete('delete')
  @UseGuards(AuthGuard)
  async deletePost(
    @Body() deletePostDto: DeletePostDto,
    @Res() res: Response,
  ) {
    await this.postService.deletePost(deletePostDto);
    res.status(HttpStatus.OK);
  }
}
