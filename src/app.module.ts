import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BasicReportsModule } from './basic-reports/basic-reports.module';
import { PrinterModule } from './printer/printer.module';
import { StoreReportsModule } from './store-reports/store-reports.module';

@Module({
  imports: [BasicReportsModule, PrinterModule, StoreReportsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
