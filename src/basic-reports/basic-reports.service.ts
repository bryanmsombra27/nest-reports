import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { PrinterService } from 'src/printer/printer.service';
import {
  getCountriesReport,
  getEmploymentLetter,
  getEmploymentLetterById,
  helloWorldReport,
} from 'src/reports';

@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  constructor(private printerService: PrinterService) {
    super();
  }

  hello() {
    const docDefinition = helloWorldReport({ name: 'koso' });
    const pdf = this.printerService.createPdf(docDefinition);

    return pdf;
  }

  employmentLetter() {
    const docDefinition = getEmploymentLetter();
    const pdf = this.printerService.createPdf(docDefinition);

    return pdf;
  }
  async employmentLetterById(id: number) {
    const employee = await this.employees.findUnique({
      where: {
        id,
      },
    });

    if (!employee) throw new NotFoundException(`employee not found`);

    const docDefinition = getEmploymentLetterById({
      employeeHours: employee.hours_per_day,
      employeeName: employee.name,
      employerName: 'Jared Hernandez',
      employeePosition: employee.position,
      employeeStartDate: employee.start_date,
      employeeWorkSchedule: employee.work_schedule,
      employerCompany: 'Tucan Code Corp',
      employerPosition: ' Gerente RH',
    });
    const pdf = this.printerService.createPdf(docDefinition);

    return pdf;
  }

  async getCountries() {
    const countries = await this.countries.findMany({
      where: {
        local_name: {
          not: null,
        },
      },
    });

    const docDefinition = getCountriesReport({
      data: countries,
    });

    const pdf = this.printerService.createPdf(docDefinition);

    return pdf;
  }
}
