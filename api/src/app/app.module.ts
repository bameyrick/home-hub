import { Module } from '@nestjs/common';
import { CalDavModule } from '../caldav/caldav.module';
import { SettingsModule } from '../settings/settings.module';
import { WeatherModule } from '../weather/weather.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SocketGateway } from './socket.gateway';

@Module({
  imports: [SettingsModule, WeatherModule, CalDavModule],
  controllers: [AppController],
  providers: [AppService, SocketGateway],
})
export class AppModule {}
