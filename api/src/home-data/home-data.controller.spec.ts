import { Test, TestingModule } from '@nestjs/testing';
import { HomeDataController } from './home-data.controller';

describe('HomeDataController', () => {
  let controller: HomeDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HomeDataController],
    }).compile();

    controller = module.get<HomeDataController>(HomeDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
