import { Controller, Get, Param, Post } from '@nestjs/common';
import { AniListService } from './ani-list.service';

@Controller('ani-list')
export class AniListController {
  constructor(private readonly aniListService: AniListService) {}

  @Get('anime/popular')
  async discoverPopularAnime() {
    return await this.aniListService.fetchPopularAnime();
  }

  @Get('anime/:anime/:page/:perPage')
  async searchAnime(
    @Param() anime: string,
    @Param() page: number,
    @Param() perPage: number,
  ) {
    return await this.aniListService.discoverAnime(anime, page, perPage);
  }
}
