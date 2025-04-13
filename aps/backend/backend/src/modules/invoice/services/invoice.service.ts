import {
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { CreateInvoiceDto } from '../dto/create-invoice.dto';
import { GetInvoiceDto } from '../dto/get-invoice.dto';
import { UpdateInvoiceDto } from '../dto/update-invoice.dto';
import { DeleteInvoiceDto } from '../dto/delete-invoice.dto';
import { IssueInvoiceDto } from '../dto/issue-invoice.dto';
import { ChangeInvoiceStatusDto } from '../dto/change-status-invoice.dto';
import { SendInvoiceDto } from '../dto/send-invoice.dto';
import { DownloadInvoiceDto } from '../dto/download-invoice.dto';

import { INVOICE_RESPONSE_CODES } from '../utils';

interface Invoice {
  id: string;
  name: string;
}

// Temporary in-memory database (replace with real DB)
const profiles: Invoice[] = [];

@Injectable()
export class InvoiceService {

  async createInvoice(createInvoiceDto:CreateInvoiceDto) {

    //TODO - logic to create invoice in database

    //throw new BadRequestException("")
    return {message: INVOICE_RESPONSE_CODES.INVOICE_CREATED_SUCCESSFULLY}
  }

  async getInvoice(getProfileDto: GetInvoiceDto) {
    //const { id } = getProfileDto;

    //TODO implement to get invoice from database
    // Check if the user already exists
    //if (users.//find((user) => user.email === email)) {
     // throw new BadRequestException('Email already in use');
    //}

    return { message: INVOICE_RESPONSE_CODES.INVOICE_RETURNED_SUCCESSFULLY }
  }

  async updateInvoice(updateInvoiceDto: UpdateInvoiceDto) {
   //TODO - implement logic to update invoice in database

    // const user = users.find((user) => user.email === email);

    //if (!user || !(await this.validatePassword(password, user.passwordHash))) {
     // throw new UnauthorizedException('Invalid credentials');
    //}

   // con//st token = this.jwtService.sign({ id: user.id, email: user.email });

    //res.cookie('auth_token', token, { httpOnly: true, secure: true });
    return { message: INVOICE_RESPONSE_CODES.INVOICE_UPDATED_SUCCESSFULLY };
  }

  async deleteInvoice(deleteInvoiceDto: DeleteInvoiceDto) {
    //TODO - implement-logic to delete invoice from database
    return {message: INVOICE_RESPONSE_CODES.INVOICE_DELETED_SUCCESSFULLY}
  }

  async changeInvoiceStatus(changeInvoiceStatusDto:ChangeInvoiceStatusDto) {
    //TODO - implement logic to chagne invoice status in database
    return {message: INVOICE_RESPONSE_CODES.INVOICE_CHANGE_STATUS_SUCCESSFULLY}
  }

  async issueInvoice(issueInvoiceDto:IssueInvoiceDto){
    //TODO implement logic to issue invoice

    return {message: INVOICE_RESPONSE_CODES.INVOICE_ISSUED_SUCCESFULLY}
  }

  async sendInvoice(SendInvoiceDto: SendInvoiceDto) {

    //TODO - implement logic to use mailer service to send invoice

    return{message: INVOICE_RESPONSE_CODES.INVOICE_SENT_SUCCESSFULLY}
  }

  async downloadInvoice(downloadInvoiceDto: DownloadInvoiceDto) {

    //TODO - implement logic to download invoice

    return{message: INVOICE_RESPONSE_CODES.INVOICE_DOWNLOADED_SUCCESSFULLY}
  }
}
