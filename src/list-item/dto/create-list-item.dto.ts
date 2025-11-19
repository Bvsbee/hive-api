import { Media } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateListItemDto {
  @IsNotEmpty()
  @IsString()
  listGuid: string;

  media: Media;
}
