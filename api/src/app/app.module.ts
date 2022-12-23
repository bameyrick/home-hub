import { Module } from '@nestjs/common';
import { SettingsModule } from '../settings/settings.module';
import { WeatherModule } from '../weather/weather.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [SettingsModule, WeatherModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
