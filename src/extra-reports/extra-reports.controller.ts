import { Controller, Get, Res } from '@nestjs/common';
import { ExtraReportsService } from './extra-reports.service';
import { Response } from 'express';

@Controller('extra-reports')
export class ExtraReportsController {
  constructor(private readonly extraReportsService: ExtraReportsService) {}

  @Get('html-reports')
  async htmlReport(@Res() res: Response) {
    const pdf = this.extraReportsService.getHtmlReport();
    res.setHeader('Content-Type', 'application/pdf');

    pdf.info.Title = 'Countries';
    pdf.pipe(res);
    pdf.end();
  }
  @Get('community-report')
  async communityReport(@Res() res: Response) {
    const pdf = this.extraReportsService.getCommunityReport();

    res.setHeader('Content-Type', 'application/pdf');
    pdf.info.Title = 'Countries';
    pdf.pipe(res);
    pdf.end();
  }
  @Get('custom-size')
  async customSize(@Res() res: Response) {
    const pdf = this.extraReportsService.getCustomSizeReport();

    res.setHeader('Content-Type', 'application/pdf');
    pdf.info.Title = 'Countries';
    pdf.pipe(res);
    pdf.end();
  }
}
