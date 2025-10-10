import { Controller, Get } from '@nestjs/common';
import { TmdbService } from './tmdb.service';

@Controller('tmdb')
export class TmdbCotnroller {
  constructor(private readonly tmdbService: TmdbService) {}

  @Get('discover/tv')
  async discoverTvShows() {
    return this.tmdbService.discoverTvShows();
  }

  @Get('discover/movie')
  async discoverMovies() {
    return this.tmdbService.discoverMovies();
  }
}
