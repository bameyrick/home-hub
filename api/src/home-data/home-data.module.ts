import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { HomeDataController } from './home-data.controller';
import { HomeDataService } from './home-data.service';

@Module({
  imports: [DatabaseModule],
  controllers: [HomeDataController],
  providers: [HomeDataService],
  exports: [HomeDataService],
})
export class HomeDataModule {}
