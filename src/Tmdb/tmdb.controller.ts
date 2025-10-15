import { Controller, Get, Param } from '@nestjs/common';
import { TmdbService } from './tmdb.service';
import { query } from 'express';

@Controller('tmdb')
export class TmdbCotnroller {
  constructor(private readonly tmdbService: TmdbService) {}

  @Get('discover/tv')
  async discoverTvShows() {
    return await this.tmdbService.discoverTvShows();
  }

  @Get('discover/movie')
  async discoverMovies() {
    return await this.tmdbService.discoverMovies();
  }

  @Get('search/:type/:query')
  async searchMedia(
    @Param('type') type: 'movie' | 'tv',
    @Param('query') query: string,
  ) {
    return await this.tmdbService.search(type, query);
  }
}
