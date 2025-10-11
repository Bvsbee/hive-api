import { Module } from '@nestjs/common';
import { AniListService } from './ani-list.service';
import { AniListController } from './ani-list.controller';

@Module({
  controllers: [AniListController],
  providers: [AniListService],
})
export class AniListModule {}
