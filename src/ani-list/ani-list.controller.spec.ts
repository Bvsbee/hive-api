import { Test, TestingModule } from '@nestjs/testing';
import { AniListController } from './ani-list.controller';
import { AniListService } from './ani-list.service';

describe('AniListController', () => {
  let controller: AniListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AniListController],
      providers: [AniListService],
    }).compile();

    controller = module.get<AniListController>(AniListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
