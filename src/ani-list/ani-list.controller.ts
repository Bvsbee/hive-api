import { Controller, Get, Post } from '@nestjs/common';
import { AniListService } from './ani-list.service';

@Controller('ani-list')
export class AniListController {
  constructor(private readonly aniListService: AniListService) {}

  @Get('anime')
  async discoverAnime() {
    return;
  }
}
