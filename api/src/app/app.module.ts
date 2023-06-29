import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CalDavModule } from '../caldav/caldav.module';
import { SettingsModule } from '../settings/settings.module';
import { WeatherModule } from '../weather/weather.module';

import { HomeDataModule } from '../home-data/home-data.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SocketGateway } from './socket.gateway';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'home-hub'),
    }),
    SettingsModule,
    WeatherModule,
    CalDavModule,
    HomeDataModule,
  ],
  controllers: [AppController],
  providers: [AppService, SocketGateway],
})
export class AppModule {}
