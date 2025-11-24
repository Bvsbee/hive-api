import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { TvResult } from './interfaces/TvResult';
import { MovieResult } from './interfaces/MoiveResult';

@Injectable()
export class TmdbService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async discoverTvShows() {
    const results = await this.fetchFromTmdb('/discover/tv', {
      params: { page: 1 },
    });

    const showsToReturn: TvResult[] = results.map((show: any) => ({
      id: show.id,
      name: show.name,
      overview: show.overview,
      firstAirDate: show.first_air_date,
      posterPath: show.poster_path,
      backdropPath: show.backdrop_path,
      rating: show.vote_average,
      video: show.video,
    }));

    return showsToReturn;
  }

  async search(type: 'movie' | 'tv', query: string) {
    const results = await this.fetchFromTmdb(`search/${type}`, {
      params: { query, page: 1 },
    });

    if (type == 'movie') {
      const showsToReturn: TvResult[] = results.map((show: any) => ({
        id: show.id,
        name: show.name,
        overview: show.overview,
        firstAirDate: show.first_air_date,
        posterPath: show.poster_path,
        backdropPath: show.backdrop_path,
        rating: show.vote_average,
        video: show.video,
        mediaType: type,
      }));

      return showsToReturn;
    } else {
      const moviesToReturn: MovieResult[] = results.map((movie: any) => ({
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        releaseDate: movie.release_date,
        posterPath: movie.poster_path,
        backdropPath: movie.backdrop_path,
        rating: movie.vote_average,
        video: movie.video,
        mediaType: type,
      }));

      return moviesToReturn;
    }
  }

  async searchTvShows(query: string) {
    const results = await this.fetchFromTmdb(`search/tv`, {
      params: { query, page: 1 },
    });

    const showsToReturn: TvResult[] = results.map((show: any) => ({
      id: show.id,
      name: show.name,
      overview: show.overview,
      firstAirDate: show.first_air_date,
      posterPath: show.poster_path,
      backdropPath: show.backdrop_path,
      rating: show.vote_average,
      video: show.video,
    }));

    return showsToReturn;
  }
  async discoverMovies() {
    const results = await this.fetchFromTmdb('/discover/movie', {
      params: { page: 1 },
    });

    console.log(results);

    const moviesToReturn: MovieResult[] = results.map((movie: any) => ({
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      releaseDate: movie.release_date,
      posterPath: movie.poster_path,
      backdropPath: movie.backdrop_path,
      rating: movie.vote_average,
      video: movie.video,
    }));

    return moviesToReturn;
  }

  async searchMovies(query: string) {
    const results = await this.fetchFromTmdb(`search/movie`, {
      params: { query, page: 1 },
    });

    const moviesToReturn: MovieResult[] = results.map((movie: any) => ({
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      releaseDate: movie.release_date,
      posterPath: movie.poster_path,
      backdropPath: movie.backdrop_path,
      rating: movie.vote_average,
      video: movie.video,
    }));

    return moviesToReturn;
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

    return await data.results;
  }
}
