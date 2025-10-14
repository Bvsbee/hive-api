import { Controller, Get, Param } from '@nestjs/common';
import { TmdbService } from './tmdb.service';

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

  @Get('search/movie')
  async searchMovies(@Param() movie: string) {
    return await this.tmdbService.searchMovies(movie);
  }

  @Get('search/tv/:tvShow')
  async searchTvShows(@Param() tvShow: string) {
    return await this.tmdbService.searchTvShows(tvShow);
  }
}
