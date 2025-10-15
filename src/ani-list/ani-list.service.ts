import { query } from 'express';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AniListService {
  constructor(private readonly httpService: HttpService) {}

  private async fetchFromAniList(query: string, variables: string) {
    const { data } = await firstValueFrom(
      this.httpService.post('https://graphql.anilist.co', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: {
          query: query,
          variables: variables,
        },
      }),
    );
  }
}
