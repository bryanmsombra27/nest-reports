import { Controller, Get, Param, ParseIntPipe, Res } from '@nestjs/common';
import { StoreReportsService } from './store-reports.service';
import { Response } from 'express';

@Controller('store-reports')
export class StoreReportsController {
  constructor(private readonly storeReportsService: StoreReportsService) {}

  @Get('orders/:orderId')
  async getOrderReport(
    @Param('orderId', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    const pdf = await this.storeReportsService.getOrderReportById(id);

    res.setHeader('Content-Type', 'application/pdf');

    pdf.info.Title = `Order N° ${id}`;
    pdf.pipe(res);
    pdf.end();
  }
}
