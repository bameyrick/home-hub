import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { WeatherGateway } from './weather.gateway';
import { WeatherService } from './weather.service';

@Module({
  imports: [DatabaseModule, HttpModule],
  providers: [WeatherGateway, WeatherService],
})
export class WeatherModule {}
