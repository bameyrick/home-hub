import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { WeatherService } from './weather.service';

@Module({
  imports: [DatabaseModule, HttpModule],
  providers: [WeatherService],
  exports: [WeatherService],
})
export class WeatherModule {}
