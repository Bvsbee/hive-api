import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { firstValueFrom } from 'rxjs';
import { BookResult } from './interfaces/BookResult';

@Injectable()
export class BookService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async discoverPopularBooks(): Promise<BookResult[]> {
    const data = await this.fetchFromNyTimes();

    const books: BookResult[] = data.results.lists.flatMap((list) =>
      list.books.map((book: any) => ({
        title: book.title,
        author: book.author,
        description: book.description,
        book_image: book.book_image,
        published_date: book.published_date,
      })),
    );

    return books;
  }

  private async fetchFromNyTimes() {
    const token = this.configService.get<string>('NYTIMES_API_KEY');
    try {
      const { data } = await firstValueFrom(
        this.httpService.get(
          `https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=${token}`,
        ),
      );

      return data;
    } catch (error) {
      if (error.response) {
        console.error('NyTimes error response:', error.response.data);
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
