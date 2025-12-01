import { Test, TestingModule } from '@nestjs/testing';
import { AniListService } from './ani-list.service';

describe('AniListService', () => {
  let service: AniListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AniListService],
    }).compile();

    service = module.get<AniListService>(AniListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
