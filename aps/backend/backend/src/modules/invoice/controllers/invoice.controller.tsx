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
import { InvoiceService } from '../services/invoice.service';
import { CreateInvoiceDto } from '../dto/create-invoice.dto';
import { GetInvoiceDto } from '../dto/get-invoice.dto';
import { UpdateInvoiceDto } from '../dto/update-invoice.dto';
import { DeleteInvoiceDto } from '../dto/delete-invoice.dto';
import { ChangeInvoiceStatusDto } from '../dto/change-status-invoice.dto';
import { IssueInvoiceDto } from '../dto/issue-invoice.dto';
import { SendInvoiceDto } from '../dto/send-invoice.dto';
import { DownloadInvoiceDto } from '../dto/download-invoice.dto';

import { Response, Request } from 'express';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';

@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post('create')
  @UseGuards(AuthGuard)
  async createProfile(
    @Body() createInvoiceDto: CreateInvoiceDto,
    @Res() res: Response,
  ) {
    const invoice = await this.invoiceService.createInvoice(createInvoiceDto);
    res.status(HttpStatus.CREATED).json(invoice);
  }

  @Get('')
  @UseGuards(AuthGuard)
  async getInvoice(@Body() getInvoiceDto: GetInvoiceDto, @Res() res: Response) {
    const invoice = await this.invoiceService.getInvoice(getInvoiceDto);
    // res.cookie('auth_token', accessToken, { httpOnly: true, secure: true });
    res.status(HttpStatus.FOUND).json(invoice);
  }

  @Post('update')
  @UseGuards(AuthGuard)
  async updateInvoice(
    @Body() updateInvoiceDto: UpdateInvoiceDto,
    @Res() res: Response,
  ) {
    await this.invoiceService.updateInvoice(updateInvoiceDto);
    res.status(HttpStatus.OK);
  }

  @Delete('delete')
  @UseGuards(AuthGuard)
  async deleteInvoice(
    @Body() deleteInvoiceDto: DeleteInvoiceDto,
    @Res() res: Response,
  ) {
    await this.invoiceService.deleteInvoice(deleteInvoiceDto);
    res.status(HttpStatus.OK);
  }

  @Post('change-status')
  @UseGuards(AuthGuard)
  async changeInvoiceStatus(
    @Body() changeInvoiceStatusDto: ChangeInvoiceStatusDto,
    @Res() res: Response,
  ) {
    await this.invoiceService.deleteInvoice(changeInvoiceStatusDto);
    res.status(HttpStatus.OK);
  }

  @Post('issue/:id')
  @UseGuards(AuthGuard)
  async issueInvoice(
    @Body() issueInvoiceDto: IssueInvoiceDto,
    @Res() res: Response,
  ) {
    await this.invoiceService.deleteInvoice(issueInvoiceDto);
    res.status(HttpStatus.OK);
  }

  @Get('download/:id')
  @UseGuards(AuthGuard)
  async downloadInvoice(
    @Body() downloadInvoiceDto: DownloadInvoiceDto,
    @Res() res: Response,
  ) {
    await this.invoiceService.downloadInvoice(downloadInvoiceDto);
    res.status(HttpStatus.OK);
  }

  @Get('send/:id')
  @UseGuards(AuthGuard)
  async sendInvoice(
    @Body() sendInvoiceDto: SendInvoiceDto,
    @Res() res: Response,
  ) {
    await this.invoiceService.sendInvoice(sendInvoiceDto);
    res.status(HttpStatus.OK);
  }
}
