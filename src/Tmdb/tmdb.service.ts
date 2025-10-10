import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TmdbService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async discoverTvShows() {
    const allTvShows = await this.fetchFromTmdb('/discover/tv', {
      params: { page: 1 },
    });

    return allTvShows;
  }

  async discoverMovies() {
    const allMovies = await this.fetchFromTmdb('/discover/movie', {
      params: { page: 1 },
    });

    return allMovies;
  }

  private async fetchFromTmdb(
    endpoint: string,
    options: { params?: Record<string, any> } = {},
  ) {
    const token = this.configService.get<string>('TMDB_READ_ACCESS_TOKEN');

    const { data } = await firstValueFrom(
      this.httpService.get(`https://api.themoviedb.org/3/${endpoint}`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        params: options.params,
      }),
    );

    return data.results;
  }
}
