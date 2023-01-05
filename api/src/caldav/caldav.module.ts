import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CalDavService } from './caldav.service';

@Module({
  imports: [DatabaseModule],
  providers: [CalDavService],
  exports: [CalDavService],
})
export class CalDavModule {}
