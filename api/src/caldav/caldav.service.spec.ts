import { Test, TestingModule } from '@nestjs/testing';
import { CalDavService } from './caldav.service';

describe('CaldavService', () => {
  let service: CalDavService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CalDavService],
    }).compile();

    service = module.get<CalDavService>(CalDavService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
