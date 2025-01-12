import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrinterService } from 'src/printer/printer.service';
import { helloWorldReport, orderByIdReport } from 'src/reports';

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
}
