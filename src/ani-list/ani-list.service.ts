import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AniListService {
  constructor(private readonly httpService: HttpService) {}

  async discoverAnime(
    search: string,
    page: number,
    perPage: number,
  ): Promise<any> {
    const query = `query SearchAnime($search: String, $page: Int, $perPage: Int) {
  Page(page: $page, perPage: $perPage) {
    media(search: $search, type: ANIME) {
      id
      title {
        romaji
        english
        native
      }
      description
      episodes
      averageScore
      genres
      coverImage {
        medium
        color
      }
      startDate {
        year
        month
        day
      }
    }
  }
}`;

    const variables = {
      search,
      page,
      perPage,
    };

    const result = await this.fetchAniListData(query, variables);

    return result.data.Page.media; // ← FIXED
  }

  async fetchPopularAnime(): Promise<any> {
    const page = 1;
    const perPage = 10;

    const query = `query Query($type: MediaType, $sort: [MediaSort],$page: Int!, $perPage: Int!) 
    {
      Page(page: $page, perPage: $perPage)
      {
        media(type: $type, sort: $sort) 
        {
          id
          description
          averageScore
          startDate {
            day, 
            month, 
            year
          }
          episodes
          genres
          title {
            romaji
            english
            native
          }
          coverImage {
          color
          medium
          }
        }
      }
    }
    `;

    const variables = {
      type: 'ANIME',
      sort: 'POPULARITY_DESC',
      page,
      perPage,
    };

    const result = await this.fetchAniListData(query, variables);

    return result.data.Page.media; 
  }

  private async fetchAniListData<T extends Record<string, any>>(
    query: string,
    variables?: T,
  ) {
    try {
      const { data } = await firstValueFrom(
        this.httpService.post(
          'https://graphql.anilist.co',
          {
            query,
            variables,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          },
        ),
      );

      return data;
    } catch (error) {
      if (error.response) {
        console.error('AniList error response:', error.response.data);
        console.error('Status code:', error.response.status);
      } else {
        console.error('Network or unexpected error:', error.message);
      }
      if (axios.isAxiosError(error)) {
        console.error('Axios error response:', error.response?.data);
      }
      throw error;
    }
  }
}
