import { Module } from '@nestjs/common';
import { AniListService } from './ani-list.service';
import { AniListController } from './ani-list.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [AniListController],
  providers: [AniListService],
  exports: [AniListService],
})
export class AniListModule {}
