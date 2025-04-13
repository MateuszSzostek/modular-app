import {
  Injectable,
} from '@nestjs/common';
import { GeneratePdfInvoiceDto } from '../dto/generate-pdf-invoice-dto';

@Injectable()
export class PdfGeneratorService {

  async generaterPdfInvoice(GeneratePdfInvoiceDto: GeneratePdfInvoiceDto) {

    //TODO - logic to implement generating pdf invoice

    //throw new BadRequestException("")
    return true
  }
}
