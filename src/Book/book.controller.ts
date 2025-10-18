import { Controller, Get } from '@nestjs/common';
import { BookService } from './book.service';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get('nytimes')
  async discoverPopularBooks() {
    return this.bookService.discoverPopularBooks();
  }
}
