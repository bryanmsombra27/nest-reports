import { Injectable } from '@nestjs/common';
import { PrinterService } from 'src/printer/printer.service';
import { communityReport, helloWorldReport } from 'src/reports';
import fs from 'fs';
import { getHtmlContent } from 'src/helpers/html-to-pdf';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerSection } from 'src/reports/sections/header.section';
import { footerSection } from 'src/reports/sections/footer.section';

@Injectable()
export class ExtraReportsService {
  constructor(private readonly printerService: PrinterService) {}

  getHtmlReport() {
    const html = fs.readFileSync('src/reports/html/basic-2.html', 'utf-8');

    const content = getHtmlContent(html);
    const docDefinition: TDocumentDefinitions = {
      content,
      pageMargins: [40, 110, 40, 60],
      footer: footerSection,
      header: headerSection({
        title: 'Convertir HTML a PDF',
      }),
    };

    const doc = this.printerService.createPdf(docDefinition);

    return doc;
  }

  getCommunityReport() {
    const docDefinition = communityReport();

    const doc = this.printerService.createPdf(docDefinition);

    return doc;
  }
  getCustomSizeReport() {
    const doc = this.printerService.createPdf({
      // pageSize: {
      //   width: 515,
      //   height: 300,
      // },
      pageSize: 'A5',
      content: [
        {
          qr: 'https://google.com',
          fit: 100,
          alignment: 'center',
        },
        {
          text: 'Reporte Size',

          fontSize: 20,
          alignment: 'center',
          margin: [0, 20],
        },
      ],
    });

    return doc;
  }
}
