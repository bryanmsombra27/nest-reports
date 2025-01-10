import { Controller, Get, Param, ParseIntPipe, Res } from '@nestjs/common';
import { BasicReportsService } from './basic-reports.service';
import { Response } from 'express';

@Controller('basic-reports')
export class BasicReportsController {
  constructor(private readonly basicReportsService: BasicReportsService) {}

  @Get()
  basicReports(@Res() res: Response) {
    const pdf = this.basicReportsService.hello();

    // SETEAR EL HEADER PARA EL TIPO DE RESPUESTA
    res.setHeader('Content-Type', 'application/pdf');

    // return res.status(200).send(pdf);
    pdf.info.Title = 'Basic Report';
    pdf.pipe(res);
    pdf.end();
  }

  @Get('employment-letter')
  employmentLetter(@Res() res: Response) {
    const pdf = this.basicReportsService.employmentLetter();

    // SETEAR EL HEADER PARA EL TIPO DE RESPUESTA
    res.setHeader('Content-Type', 'application/pdf');

    // return res.status(200).send(pdf);
    pdf.info.Title = 'Employment Letter';
    pdf.pipe(res);
    pdf.end();
  }
  @Get('employment-letter/:employeeId')
  async employmentLetterById(
    @Res() res: Response,
    @Param('employeeId', ParseIntPipe) id: number,
  ) {
    const pdf = await this.basicReportsService.employmentLetterById(id);

    // SETEAR EL HEADER PARA EL TIPO DE RESPUESTA
    res.setHeader('Content-Type', 'application/pdf');

    // return res.status(200).send(pdf);
    pdf.info.Title = 'Employment Letter';
    pdf.pipe(res);
    pdf.end();
  }
}
