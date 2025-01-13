import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrinterService } from 'src/printer/printer.service';
import {
  getStadisticsReport,
  helloWorldReport,
  orderByIdReport,
  svgChartReport,
} from 'src/reports';

@Injectable()
export class StoreReportsService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  constructor(private readonly printerService: PrinterService) {
    super();
  }

  async getOrderReportById(id: number) {
    const order = await this.orders.findUnique({
      where: {
        order_id: id,
      },
      include: {
        customers: true,
        order_details: {
          include: {
            products: true,
          },
        },
      },
    });

    console.log(JSON.stringify(order, null, 2));

    if (!order) throw new NotFoundException(`order not found`);

    const docDefinition = orderByIdReport({
      data: order as any,
    });
    const pdf = this.printerService.createPdf(docDefinition);

    return pdf;
  }

  async getSvgChartReport() {
    const docDefinition = await svgChartReport();

    const pdf = this.printerService.createPdf(docDefinition);

    return pdf;
  }
  async getStadistics() {
    const topCountries = await this.customers.groupBy({
      by: ['country'],
      _count: true,
      orderBy: {
        _count: {
          country: 'desc',
        },
      },
      take: 10,
    });

    const topCountryData = topCountries.map((item) => ({
      country: item.country,
      customers: item._count,
    }));

    const docDefinition = await getStadisticsReport({
      data: topCountryData,
    });

    const pdf = this.printerService.createPdf(docDefinition);

    return pdf;
  }
}
