import { HomeData } from '@home-hub/common';
import { Body, Controller, Post } from '@nestjs/common';
import { HomeDataService } from './home-data.service';

@Controller('home-data')
export class HomeDataController {
  constructor(private readonly homeDataService: HomeDataService) {}

  @Post()
  public postHomeData(@Body() data: HomeData): HomeData {
    this.homeDataService.updateHomeData(data);

    return data;
  }
}
