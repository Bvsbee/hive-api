import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TmdbCotnroller } from './tmdb.controller';
import { TmdbService } from './tmdb.service';

@Module({
  imports: [HttpModule],
  controllers: [TmdbCotnroller],
  providers: [TmdbService],
  exports: [TmdbService],
})
export class TmdbModule {}
