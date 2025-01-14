import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BasicReportsModule } from './basic-reports/basic-reports.module';
import { PrinterModule } from './printer/printer.module';
import { StoreReportsModule } from './store-reports/store-reports.module';
import { ExtraReportsModule } from './extra-reports/extra-reports.module';

@Module({
  imports: [BasicReportsModule, PrinterModule, StoreReportsModule, ExtraReportsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
