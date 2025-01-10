import { Injectable } from '@nestjs/common';
import PdfPrinter from 'pdfmake';
import type { BufferOptions, TDocumentDefinitions } from 'pdfmake/interfaces';

const fonts = {
  Roboto: {
    normal: 'fonts/Roboto-Regular.ttf',
    bold: 'fonts/Roboto-Medium.ttf',
    italics: 'fonts/Roboto-Italic.ttf',
    bolditalics: 'fonts/Roboto-MediumItalic.ttf',
  },
};

@Injectable()
export class PrinterService {
  private printer = new PdfPrinter(fonts);

  createPdf(
    doc: TDocumentDefinitions,
    opt?: BufferOptions,
  ): PDFKit.PDFDocument {
    const docDefinition: TDocumentDefinitions = doc;

    const pdfDoc = this.printer.createPdfKitDocument(docDefinition, opt);

    return pdfDoc;
  }
}
