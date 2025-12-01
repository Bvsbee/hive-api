import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AniListService } from './ani-list.service';
import { SearchAnimeDto } from './SearchAnime.dto';

@Controller('ani-list')
export class AniListController {
  constructor(private readonly aniListService: AniListService) {}

  @Get('anime/popular')
  async discoverPopularAnime() {
    return await this.aniListService.fetchPopularAnime();
  }

  @Get('anime')
  async searchAnime(@Query() searchAnimeDto: SearchAnimeDto) {
    const { anime, page, perPage } = searchAnimeDto;
    return await this.aniListService.discoverAnime(anime, page, perPage);
  }
}
