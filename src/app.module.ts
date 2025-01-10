import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BasicReportsModule } from './basic-reports/basic-reports.module';

@Module({
  imports: [BasicReportsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
