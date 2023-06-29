import { HomeData } from '@home-hub/common';
import { Injectable } from '@nestjs/common';
import { DatabasePersistenceService } from '../database/database.service';

@Injectable()
export class HomeDataService {
  public readonly homeData$ = this.db.homeData$;

  constructor(private readonly db: DatabasePersistenceService) {}

  public updateHomeData(data: HomeData): void {
    this.db.homeData$.next(data);
  }
}
