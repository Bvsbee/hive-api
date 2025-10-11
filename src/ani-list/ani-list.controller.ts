import { Controller, Post } from '@nestjs/common';
import { AniListService } from './ani-list.service';

@Controller('ani-list')
export class AniListController {
  constructor(private readonly aniListService: AniListService) {}

  @Post('ani-list/')
  async discoverAnime() {}
}
