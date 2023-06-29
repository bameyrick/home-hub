import { Test, TestingModule } from '@nestjs/testing';
import { HomeDataService } from './home-data.service';

describe('HomeDataService', () => {
  let service: HomeDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HomeDataService],
    }).compile();

    service = module.get<HomeDataService>(HomeDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
