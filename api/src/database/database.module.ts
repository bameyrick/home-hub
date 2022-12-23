import { Module } from '@nestjs/common';
import { DatabasePersistenceService } from './database.service';

@Module({
  providers: [DatabasePersistenceService],
  exports: [DatabasePersistenceService],
})
export class DatabaseModule {}
